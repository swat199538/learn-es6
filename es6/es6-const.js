// const 命令
//const 声明一个只读常量。一旦声明，常量的值就不能改变。

const pi = 3.1415926;
console.log(pi);
pi = 1; //Assignment to constant variable. 报错

//const 声明的变量不得改变值，这意味着，const一旦声明变量，就必须立即初始化
//不能保留到以后赋值
const a; //报错:Missing initializer in const declaration

//const 的作用域和 let 的作用域相同：只在声明所在的作用域有效
if(true){
    const max = 5;
}
console.log(max) // 报错:max is not defined

//const 声明的常量也是不得提升，同样存在暂时性死区，只能在声明的位置后面使用
if(true){
    console.log(max);
    const max = 5; //报错：max is not defined
}

//const 声明也和let一样不可重复声明
var msg = "hello world";
let age = 5;

const msg = 'a';//报错：Identifier 'msg' has already been declared
const age = 6;//报错:Identifier 'age' has already been declared

//本质:const 实际上保证的，并不是变量的值不得改动，而是变量指向的那个内存地址
//不得改动。对于简单类型的数据(数值，字符串，布尔型)，值就保持在那个变量指向的
//内存地址，因此等同于常量。对于复合类型的数据(主要是对象和数组)，变量指向的内
//存地址，保持的只是一个指针，const只能保证这个指针是固定的，至于它指向的数据
//结构是不是可变的就不能控制了。因此将一个对象声明为常量必须非常小心。
const foo = {};
foo.prop =123;
console.log(foo.prop);
foo = {}; //报错：Assignment to constant variable.
//上面代码变量 foo 存储的是一个地址，这个地址指向的是一个对象。不可变的只是这个
//地址，即不可把foo指向另一个地址，但对象本身是可变的，所以依然可以给它添加新的属性

//下面是另一个例子
const a  = [];
a.push('hello');//可执行
a.length = 0;//可执行
a = ['dave'];//报错:Uncaught TypeError: Assignment to constant variable.
//上面代码，常量a是一个数组，这个数组本身是可写的，但是将另一个数组赋值给a就会报错

//如果真的想将数组冻结，应用是用Object.freeze方法
const foo = Object.freeze({});
//常规模式下一个不起作用，严格模式下一行会报错
foo.prop = 123;
//上面代码，foo指向一个冻结对象，所以添加新属性不起作用，严格模式还会报错

//除了对象本身冻结，对象属性也应该冻结，下面是一个将对象彻底冻结的函数
var constantize = (obj) => {
    Object.freeze(obj);
    Object.keys(obj).forEach( (key, i) => {
      if ( typeof obj[key] === 'object' ) {
        constantize( obj[key] );
      }
    });
  };

