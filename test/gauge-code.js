function GAUGE_CODE() {
  {
    var odds = evens.map(v => v + 1)
    var nums = evens.map((v, i) => v + i)
    var pairs = evens.map(v => ({ even: v, odd: v + 1 }))
    nums.forEach(v => {
      if (v % 5 === 0) fives.push(v)
    })
    var bob = {
      _name: 'Bob',
      _friends: [],
      printFriends() {
        this._friends.forEach(f => console.log(this._name + ' knows ' + f))
      }
    }
  }

  {
    class SkinnedMesh extends THREE.Mesh {
      constructor(geometry, materials) {
        super(geometry, materials)
        this.idMatrix = SkinnedMesh.defaultMatrix()
        this.bones = []
        this.boneMatrices = []
      }
      update(camera) {
        super.update()
      }
      get boneCount() {
        return this.bones.length
      }
      set matrixType(matrixType) {
        this.idMatrix = SkinnedMesh[matrixType]()
      }
      static defaultMatrix() {
        return new THREE.Matrix4()
      }
    }

    var obj = {
      __proto__: theProtoObj,
      handler,
      toString() {
        return 'd ' + super.toString()
      },
      ['prop_' + (() => 42)()]: 42
    }
  }

  {
    ;`In JavaScript '\n' is a line-feed.``In JavaScript this is // Multiline strings
 not legal.`
    var name = 'Bob',
      time = 'today'
    ;`Hello ${name}, how are you ${time}?`

    POST`http://foo.org/bar?a=${a}&b=${b}
     Content-Type: application/json
     X-Credentials: ${credentials}
     { "foo": ${foo},
       "bar": ${bar}}`(myOnReadyStateChangeHandler)
  }

  {
    var [a, , b] = [1, 2, 3]
    var { op: a, lhs: { op: b }, rhs: c } = getASTNode()
    var { op, lhs, rhs } = getASTNode()
    function g({ name: x }) {
      console.log(x)
    }
    g({ name: 5 })
  }

  {
    var [a] = []
    a === undefined
    var [a = 1] = []
    a === 1
  }

  {
    function f(x, y = 12) {
      return x + y
    }
    f(3) == 15
  }

  {
    function f(x, ...y) {
      return x * y.length
    }

    f(3, 'hello', true) == 6
  }

  {
    function f(x, y, z) {
      return x + y + z
    }
    f(...[1, 2, 3]) == 6
  }

  {
    function f() {
      {
        let x
        {
          const x = 'sneaky'
        }
        x = 'inner'
      }
    }
  }

  {
    let fibonacci = {
      [Symbol.iterator]() {
        let pre = 0,
          cur = 1
        return {
          next() {
            ;[pre, cur] = [cur, pre + cur]
            return { done: false, value: cur }
          }
        }
      }
    }

    for (var n of fibonacci) {
      if (n > 1000) break
      console.log(n)
    }
  }

  {
    var fibonacci = {
      [Symbol.iterator]: function*() {
        var pre = 0,
          cur = 1
        for (;;) {
          var temp = pre
          pre = cur
          cur += temp
          yield cur
        }
      }
    }

    for (var n of fibonacci) {
      if (n > 1000) break
      console.log(n)
    }
  }

  {
    '𠮷'.length == 2
    '𠮷'.match(/./u)[0].length == 2
    ;('\u{20BB7}' == '𠮷') == '\uD842\uDFB7'
    '𠮷'.codePointAt(0) == 0x20bb7
    for (var c of '𠮷') {
      console.log(c)
    }
  }

  {
    var MyClass = (function() {
      var key = Symbol('key')
      function MyClass(privateData) {
        this[key] = privateData
      }
      MyClass.prototype = {
        doStuff: function() {}
      }

      return MyClass
    })()

    var c = new MyClass('hello')
    c['key'] === undefined
  }

  {
    class Array {
      constructor(...args) {}
      static [Symbol.create]() {}
    }

    class MyArray extends Array {
      constructor(...args) {
        super(...args)
      }
    }
  }

  {
    0b111110111 === 503

    0o767 === 503

    2 ** 8
  }

  {
    async function sayHello() {
      const externalFetchedText = await fetchTextByPromise()
      console.log(`Hello, ${externalFetchedText}`)
    }

    sayHello()

    const sayHelloArrow = async () => {
      const externalFetchedText = await fetchTextByPromise()
      console.log(`Hello, ${externalFetchedText}`)
    }

    sayHelloArrow()
  }
}
