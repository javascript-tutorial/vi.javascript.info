# Mixin

Trong JavaScript, chúng ta chỉ có thể kế thừa từ một đối tượng duy nhất. Chỉ có thể có một `[[Prototype]]` cho một đối tượng. Và một class chỉ có thể mở rộng một class khác.

Nhưng đôi khi điều đó cảm thấy hạn chế. Chẳng hạn, chúng ta có một class `StreetSweeper` và một class `Bicycle`, và muốn kết hợp chúng: một `StreetSweepingBicycle`.

Hoặc chúng ta có một class `User` và một class `EventEmitter` thực hiện tạo sự kiện và chúng ta muốn thêm hàm của `EventEmitter` vào `User` để người dùng của chúng ta có thể tạo ra các sự kiện.

Có một khái niệm có thể hữu ích ở đây, được gọi là "mixin".

Theo định nghĩa trong Wikipedia, một [mixin](https://en.wikipedia.org/wiki/Mixin) là một class chứa các phương thức có thể được sử dụng bởi các class khác mà không cần kế thừa từ nó.

Nói cách khác, *mixin* cung cấp các phương thức thực hiện một hành vi nhất định, nhưng chúng ta không sử dụng nó một mình, chúng ta sử dụng nó để thêm hành vi vào các class khác.

## Một ví dụ mixin

Cách đơn giản nhất để triển khai mixin trong JavaScript là tạo một đối tượng bằng các phương thức hữu ích, để chúng ta có thể dễ dàng hợp nhất chúng thành một nguyên mẫu của bất kỳ class nào.

Ví dụ ở đây, mixin `sayHiMixin` được sử dụng để thêm một số "lời nói" cho `User`:

```js run
*!*
// mixin
*/!*
let sayHiMixin = {
  sayHi() {
    alert(`Xin chào ${this.name}`);
  },
  sayBye() {
    alert(`Tạm biệt ${this.name}`);
  }
};

*!*
// cách sử dụng:
*/!*
class User {
  constructor(name) {
    this.name = name;
  }
}

// sao chép các phương thức
Object.assign(User.prototype, sayHiMixin);

// bây giờ User có thể nói xin chào
new User("anh bạn").sayHi(); // Xin chào anh bạn!
```

Không có kế thừa, nhưng một phương thức sao chép đơn giản. Vì vậy, `User` có thể kế thừa từ một class khác và cũng bao gồm mixin để "kết hợp" các phương thức bổ sung, như sau:

```js
class User extends Person {
  // ...
}

Object.assign(User.prototype, sayHiMixin);
```

Mixin có thể tận dụng sự kế thừa bên trong chính chúng.

Chẳng hạn, ở đây `sayHiMixin` kế thừa từ `sayMixin`:

```js run
let sayMixin = {
  say(phrase) {
    alert(phrase);
  }
};

let sayHiMixin = {
  __proto__: sayMixin, // (hoặc chúng ta có thể sử dụng Object.setPrototypeOf để đặt nguyên mẫu tại đây)

  sayHi() {
    *!*
    // gọi phương thức gốc
    */!*
    super.say(`Xin chào ${this.name}`); // (*)
  },
  sayBye() {
    super.say(`Tạm biệt ${this.name}`); // (*)
  }
};

class User {
  constructor(name) {
    this.name = name;
  }
}

// sao chép các phương thức
Object.assign(User.prototype, sayHiMixin);

// bây giờ User có thể nói xin chào
new User("anh bạn").sayHi(); // Xin chào anh bạn!
```

Hãy lưu ý rằng cuộc gọi đến phương thức gốc `super.say()` từ `sayHiMixin` (tại các dòng được gắn nhãn `(*)`) sẽ tìm phương thức trong nguyên mẫu của mixin đó, chứ không phải class.

Đây là sơ đồ (xem phần bên phải):

![](mixin-inheritance.svg)

Đó là bởi vì các phương thức `sayHi` và `sayBye` ban đầu được tạo trong `sayHiMixin`. Vì vậy, mặc dù chúng đã được sao chép, nhưng tham chiếu thuộc tính bên trong `[[HomeObject]]` của chúng là `sayHiMixin`, như minh họa trong hình trên.

Vì `super` tìm kiếm các phương thức gốc trong `[[HomeObject]].[[Prototype]]`, điều đó có nghĩa là nó tìm kiếm `sayHiMixin.[[Prototype]]`, không phải `User.[[Prototype]]`.

## EventMixin

Bây giờ hãy tạo một mixin cho cuộc sống thực.

An important feature of many browser objects (for instance) is that they can generate events. Events are a great way to "broadcast information" to anyone who wants it. So let's make a mixin that allows us to easily add event-related functions to any class/object.

- The mixin will provide a method `.trigger(name, [...data])` to "generate an event" when something important happens to it. The `name` argument is a name of the event, optionally followed by additional arguments with event data.
- Also the method `.on(name, handler)` that adds `handler` function as the listener to events with the given name. It will be called when an event with the given `name` triggers, and get the arguments from the `.trigger` call.
- ...And the method `.off(name, handler)` that removes the `handler` listener.

After adding the mixin, an object `user` will be able to generate an event `"login"` when the visitor logs in. And another object, say, `calendar` may want to listen for such events to load the calendar for the logged-in person.

Or, a `menu` can generate the event `"select"` when a menu item is selected, and other objects may assign handlers to react on that event. And so on.

Here's the code:

```js run
let eventMixin = {
  /**
   * Subscribe to event, usage:
   *  menu.on('select', function(item) { ... }
  */
  on(eventName, handler) {
    if (!this._eventHandlers) this._eventHandlers = {};
    if (!this._eventHandlers[eventName]) {
      this._eventHandlers[eventName] = [];
    }
    this._eventHandlers[eventName].push(handler);
  },

  /**
   * Cancel the subscription, usage:
   *  menu.off('select', handler)
   */
  off(eventName, handler) {
    let handlers = this._eventHandlers?.[eventName];
    if (!handlers) return;
    for (let i = 0; i < handlers.length; i++) {
      if (handlers[i] === handler) {
        handlers.splice(i--, 1);
      }
    }
  },

  /**
   * Generate an event with the given name and data
   *  this.trigger('select', data1, data2);
   */
  trigger(eventName, ...args) {
    if (!this._eventHandlers?.[eventName]) {
      return; // no handlers for that event name
    }

    // call the handlers
    this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
  }
};
```


- `.on(eventName, handler)` -- assigns function `handler` to run when the event with that name occurs. Technically, there's an `_eventHandlers` property that stores an array of handlers for each event name, and it just adds it to the list.
- `.off(eventName, handler)` -- removes the function from the handlers list.
- `.trigger(eventName, ...args)` -- generates the event: all handlers from `_eventHandlers[eventName]` are called, with a list of arguments `...args`.

Usage:

```js run
// Make a class
class Menu {
  choose(value) {
    this.trigger("select", value);
  }
}
// Add the mixin with event-related methods
Object.assign(Menu.prototype, eventMixin);

let menu = new Menu();

// add a handler, to be called on selection:
*!*
menu.on("select", value => alert(`Value selected: ${value}`));
*/!*

// triggers the event => the handler above runs and shows:
// Value selected: 123
menu.choose("123");
```

Now, if we'd like any code to react to a menu selection, we can listen for it with `menu.on(...)`.

And `eventMixin` mixin makes it easy to add such behavior to as many classes as we'd like, without interfering with the inheritance chain.

## Summary

*Mixin* -- is a generic object-oriented programming term: a class that contains methods for other classes.

Some other languages allow multiple inheritance. JavaScript does not support multiple inheritance, but mixins can be implemented by copying methods into prototype.

We can use mixins as a way to augment a class by adding multiple behaviors, like event-handling as we have seen above.

Mixins may become a point of conflict if they accidentally overwrite existing class methods. So generally one should think well about the naming methods of a mixin, to minimize the probability of that happening.
