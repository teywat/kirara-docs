# 作用域容器

作用域容器时为了解决多线程中变量隔离和访问问题，附带功能有放置全局对象。

3.2版本更新后可以在`workflow`级别作用域容器中放置部分状态对象，以应对`block`块生命周期更改导致无法使用有状态块的问题。

:::tabs

=== 快速使用

## 使用技巧

- 初始化时`Plugin`被注入一个子作用域容器, 该作用域将在插件被移除时自动回收。
>```python
>from kirara_ai.ioc.container import DependencyContainer
>from kirara_ai.plugin_manager import Plugin
>
>class MyPlugin(Plugin)
>	# 插件在被初始化时会自动将根作用域容器注入到插件中。
>	def __init__(self, container: DependencyContainer):
>		# 申请一个子作用域容器避免污染系统根作用域容器。
>		self.container = container
>```

- 向作用域容器中放入一个对象
>```python
>class CustomObject:
>	# 该对象存储一些插件的全局临时信息。供block对象调取
>	def __init__(self):
>		pass
>		
>class MyPlugin(Plugin)
>	def __init__(self, container: DependencyContainer):
>		self.container = container
>		self.container.register(CustomObject, obj) # 第一个参数传入对象类型，第二个参数传入对象实例
>```

- 查找并取出一个对象
>```python
>class MyPlugin(Plugin):
>	def __init__(self, container: DependencyContainer):
>		self.container = container
>		# 从根容器中取出块注册器实例，支持递归查找
>		self.block_register = container.resolve(BlockRegister) if self.container.has(BlockRegister)
>```

- 删除一个对象
>```python
>class MyPlugin(Plugin):
>	def __init__(self, container: DependencyContainer)
>		self.container = container
>		# destory有一个可选参数recursive，该参数为一个bool类型用于控制是否递归删除，默认为False。注意一般不将其设置为True，应该这是不安全的操作可能会删除根容器的系统对象，除非你知道自己在做什么，我们不为使用递归删除操作导致的项目崩溃负责。
>		self.container.destroy(CustomObject) if self.container.has(CustomObject)
>```

- 申请一个自己的子作用域

>```python
>from kirara_ai.ioc.container import DependencyContainer
>
>class MyPlugin(Plugin):
>	 def __init__(self, container: DependencyContainer):
>		 self.container = container
>		 # container 是一个上下文对象使用with进行操作。或者使用contextlib库，该库以及自定义上下文管理器介绍请参见本教程辅助函数与工具。
>		 with container.scoped() as chirld:
>		 	 pass
>```

=== 源码以及其注释

  [源码地址](https://github.com/lss233/kirara-ai/blob/master/kirara_ai/ioc/container.py)

```python
import contextvars
from typing import Any, Optional, Type, TypeVar, overload

T = TypeVar("T")

class DependencyContainer:
    """
        依赖注入容器，提供注册和解析的功能。你可以在此获取一些全局的对象。
    基本用法：
    \```python
    # 1. 注册全局对象 - 通常在初始化时使用
    container.register(YourObj, your_obj_instance)

    # 2. 获取全局对象 - 在你的逻辑代码中使用
    your_obj_instance = container.resolve(YourObj)

    # 3. 销毁全局对象 - 通常在系统/插件销毁时使用
    container.destroy(YourObj)

    # 4. 创建作用域容器 - 作用域容器内注册的对象只在作用域内可被访问
    # 离开作用域的上下文后无法取到该对象
    # 全局容器注册对象
    container.register(KiraraObj, kirara_obj)
    with container.scoped() as scoped_container:
        # 注册作用域对象
        scoped_container.register(YourObj, your_obj_instance)
        # 获取作用域对象
        scoped_container.resolve(YourObj)
        # 作用域容器也可以获取到全局容器的对象
        container.has(KiraraObj) #  返回 True
        # 甚至还能再创建新的作用域容器
        with scoped_container.scoped() as another_scoped_container:
            another_scoped_container.has(YourObj) # True
    # 离开作用域上下文后无法获取到该对象

    container.has(YourObj) # 返回 False
	\```

    docs: https://docs.python.org/zh-cn/3.13/library/contextvars.html#module-contextvars
    
    Attributes:
        parent (DependencyContainer): 父容器实例，用于支持作用域嵌套
        registry (dict): 存储当前容器注册的值或对象实例，格式为{key: value|object}


    Methods:
        register: 向容器注册一个key-value对
        resolve: 从容器解析获取一个值或对象实例
        destroy: 从容器中移除一个值或对象实例
        scoped: 创建一个新的作用域容器
    """
    def __init__(self, parent=None):
        self.parent = parent  # 父容器，用于支持作用域嵌套
        self.registry = {}  # 当前容器的注册表
    
    def register(self, key, value):
        """
        向容器注册一个值或者实例。


        Args:
            key: 对象的标识键, 一般为对象的类 (Type) 如 IMManager, LLMManager等, 
                会根据类型自动查找对应对象实例。
            value: 值/对象实例
        """
        self.registry[key] = value
    
    @overload
    def resolve(self, key: Type[T]) -> T: ...
    
    @overload
    def resolve(self, key: Any) -> Any: ...
    
    def resolve(self, key: Type[T] | Any) -> T | Any:
        """
        依照{key}从容器解析出一个值或对象实例。
        如果{key}在当前容器中不存在，则会递归查找父容器。
    
        Args:
            key: 对象的标识键, 一般为对象的类 (Type) 如 IMManager, LLMManager等, 
                会根据类型自动查找对应对象实例。
    
        Returns:
            值/对象实例
    
        Raises:
            KeyError: {key}在当前容器和父容器中都不存在时抛出
        """
        if key in self.registry:
            return self.registry[key]
    
        elif self.parent:
            return self.parent.resolve(key)
        else:
            raise KeyError(f"Dependency {key} not found.")


    def has(self, key: Type[T] | Any) -> bool:
        """
        检测容器中是否能解析出某个键所对应的值。
        Args:
            key: 对象的标识键
        Returns:
            成功返回 True, 失败返回 False
        """
        return key in self.registry or (self.parent is not None and self.parent.has(key))
    
    @overload
    def destroy(self, key: Type[T], recursive: bool = False) -> None: ...
    
    @overload
    def destroy(self, key: Any, recursive: bool = False) -> None: ...
    
    def destroy(self, key: Type[T] | Any, recursive: bool = False) -> None:
        """
        从容器中移除一个值或对象实例。支持递归删除父元素。
        但是最好不要递归，你可能会删除一些系统对象
    
        Args:
            key: 对象的标识键
            recursive: 是否递归删除父元素, 默认False。注意这是unsafe方法, 请注意不要删除系统对象。
        Raises:
            KeyError: {key}在当前容器和父容器中都不存在时抛出
        """
        if key in self.registry:
            del self.registry[key]
        elif self.parent and recursive:
            self.parent.destroy(key, recursive)
        else: 
            raise KeyError(f"Cannot destroy dependency {key} which is not found in registry or parent container's registry.")


    def scoped(self):
        """创建一个新的作用域容器"""
        new_container = ScopedContainer(self)
    
        if DependencyContainer in self.registry:
            new_container.registry[DependencyContainer] = new_container
            new_container.registry[ScopedContainer] = new_container
        return new_container


# 使用 contextvars 实现线程和异步安全的上下文管理
current_container = contextvars.ContextVar[Optional[DependencyContainer]]("current_container", default=None)

class ScopedContainer(DependencyContainer):
    def __init__(self, parent):
        super().__init__(parent)

    def __enter__(self):
        # 将当前容器设置为新的作用域容器
        self.token = current_container.set(self)
        return self
    
    def __exit__(self, exc_type, exc_value, traceback):
        # 恢复之前的容器
        current_container.reset(self.token)
```
