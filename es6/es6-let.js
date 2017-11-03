// let命令用来声明变量，与var类似，但是声明的命令只在let所在的代码块之内有效
{
    let a = 6;
    var b = 7;
}
// console.log(a);
console.log(b);
//循环计数器就很时候let很有用
var a =10;
for(let a = 0; a<100; a++){
    console.log(a);
}
console.log(a);//输出10,因为let声明的a只在循环体里有效！

var a = [];
for (let i = 0; i < 10; i++) {
    a[i] = function () {
        console.log(i);
    };
}
a[9]();//输出9

var a = [];
for (var i =0; i < 10; i++){
    a[i] = function(){
        console.log(i)
    };
}
a[9]();//输出10

//for 循环还有一个特别之处，设置循环变量的那一部分是一个父作用域，而循环体内部是一个单独的子作用域
for(let x = 0; x < 3; x++){
    let x = 'abc';
    console.log(x);
}

//var 命令会发生“变量提示”现象，即变量可以在变量声明之前使用，值为undefined。
console.log(gg);
var gg = 'gg';

//变量提示现象很违法常理,let纠正了这种显示，会直接报错
//console.log(ggg);
// let ggg = 'ggg';  //输出es6.js:42 Uncaught ReferenceError: ggg is not defined

//暂时性死区，只要块级作用域内存在let命令，它所声明的变量就绑定在这个区域，不再受外部影响
var tmp = 123;
if (tmp){
    //tmp = 'abc';
    //let tmp ReferenceError
}
//上面代码存在全局变量tmp，打算作用域内let又声明了一个tmp变量导致后者绑定到这个作用域,所以再对let声明前对tmp赋值会报错。
//ES6明确规定如果区块中存在let和const命令，这个区块对这些声明的变量从一开始就形成了封闭作用域。凡是声明之前就使用这些变量就会报错.
//总之，再代码快内，使用let命令声明变量之前，该变量都不可用的。这在语法上称之为“暂时性死区”。

if(true){
    //死区开始
    //tmp = 'abc'; //ReferenceError
    //console.log(tmp); //ReferenceError

    let tmp;//死区结束
    console.log(tmp); //undefined

    tmp = 123;
    console.log(123); //123

}

//暂时死区也就以为着typeof不在是一个百分之百的安全操作。
typeof x; // ReferenceError
let x;
//上面代码代码中，变量x使用let命令声明，所以再声明之前，都属于x的“死区”，只要用到该变量就会报错。因此，typeof运行时就会抛出一个RefernceError
//作为比较，如果一个变量根本没有声明，typeof反而不会报错
typeof undeclared_variable;//undefined
//上面代码中，undeclared_variable是一个不存在的变量名,结果返回'undefined'。所以在没有let之前 typeof是百分之百安全的，永远不会报错，现在不成立了，
//这样的设计是为了让大家养好良好的编程习惯，变量一定要在声明之后使用，否则就会报错。

function bar(x = y, y =2){
    return[x, y];
}
bar();//报错

/**
 * 上面代码中，调用bar函数之所以报错（某些实现可能不报错），是因为参数x默认值等于另一个参数y，
 * 而此时y还没有声明，属于”死区“。如果y的默认值是x，就不会报错，因为此时x已经声明了。
 */


function bar(x = 2, y = x) {
    return [x, y];
}
bar(); // [2, 2]
//另外，下面的代码也会报错，与var的行为不同。

// 不报错
var x = x;

// 报错
let x = x;
// ReferenceError: x is not defined
//上面代码报错，也是因为暂时性死区。使用let声明变量时，只要变量在还没有声明完成前使用，
//就会报错。上面这行就属于这个情况，在变量x的声明语句还没有执行完成前，就去取x的值，导致报错”x 未定义“。

//ES6规定暂时性死区和let、const语句不出现变量提升，主要是为了减少运行时错误，反正变量在声明前就使用，从而导致意料之外的行为
//这样的错误在ES5很常见，现在有了这种规定，避免此类错误就很容易了。

//总之暂时性死区的本质就是，只要已进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行出现，才可以获取和使用该变量

//