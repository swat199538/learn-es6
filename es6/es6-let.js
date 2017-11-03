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
//ES6明确规定如果区块中存在let和const命令，这个区块对这些声明的变量从一开始就形成了封闭作用域。凡是声明之前就使用这些变
// 量就会报错.总之，再代码快内，使用let命令声明变量之前，该变量都不可用的。这在语法上称之为“暂时性死区”。

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
//上面代码代码中，变量x使用let命令声明，所以再声明之前，都属于x的“死区”，只要用到该变量就会报错。因此，typeof运行时就
// 会抛出一个RefernceError作为比较，如果一个变量根本没有声明，typeof反而不会报错
typeof undeclared_variable;//undefined
//上面代码中，undeclared_variable是一个不存在的变量名,结果返回'undefined'。所以在没有let之前 typeof是百分之百安全的，
//永远不会报错，现在不成立了，这样的设计是为了让大家养好良好的编程习惯，变量一定要在声明之后使用，否则就会报错。

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

//ES6规定暂时性死区和let、const语句不出现变量提升，主要是为了减少运行时错误，反正变量在声明前就使用，从而导致意料之外的
// 行为这样的错误在ES5很常见，现在有了这种规定，避免此类错误就很容易了。

//总之暂时性死区的本质就是，只要已进入当前作用域，所要使用的变量就已经存在了，但是不可获取，只有等到声明变量的那一行出现
// ，才可以获取和使用该变量

//不允许重复声明，let不允许在相同作用域内重复声明同一个变量。

//报错
function  funct() {
    let a = 0;
    var a = 0;
}

//报错
function funct2() {
    let a =0;
    let a =1;
}

//因此，不能再函数内部重新声明参数
function funct3(a){
    let a =1 ; //报错
}
function funct4(a){
    {
        let a;//不报错
    }
}

//块级作用域，为什么需要块级作用域？
//ES5只有全局作用域和块级作用域，没有块级作用域，这带来很多不合理的场景。
//第一种场景，内层变量可能会覆盖外层变量
var tmp = new Date();
function f() {
    console.log(tmp);
    if (false){
        var tmp = 'hello world';
    }
}
f();//undefined
//上面的代码意思是,if代码块的外部使用外层的tmp变量，内层使用内层的tmp变量
//但是，函数if执行后，输出结果为undefined,原因在于变量提升，导致内层的tmp变量覆盖了外层的tmp变量

//第二种场景，用来计数的循环变量泄露为全局变量
var feed = 'hello';
for (var test =0; test<feed.length; test++){
    console.log(feed[test]);
}
console.log(test)//5;
//上面的代码中，变量i只用来控制循环，但是循环结束后它并没有消失，泄露成了全局变量。

//ES6块级作用域,let实际是为javascript新增了块级作用域
function f1(){
    let a = 5;
    if (true){
        let a = 10;
    }
    console.log(a);
}
f1();//5
//上面的两个函数都有代码块声明了变量a,运行后输出5。这表示内层代码不受外层代码影响。
//如果两层都使用了var定义变量，最后输出的值才是10。


//ES6允许块级作用域任意嵌套
{{{{{let insane = 'five'}}}}}
//上一层一共使用了5层作用域。外层作用域无法读取内层作用域变量。
{{{{{
    {let cantRead = 'you can\'t read';}
    console.log(cantRead);//报错
}}}}}
//内层可以读到外层定义的变量
{
    let a = 1;
    {console.log(a)}
}
//内层作用域可以定义和外层同名变量
{
    let a = 1;
    {let a = 2;}
}


//块级作用域和函数声明，函数能不能在块级作用域中声明这是一个相当令人混淆的问题
//es5规定，函数只能在顶层作用域和函数作用域中声明，不能在块级作用域声明。
//情况一
if(true){
    function f(){}
}
//情况二
try{
    function f() {}
} catch (e){}
//上面两种函数声明在es5都是非法的，但是浏览器没有遵守这个规定，为了兼容以前的旧代码
//还是支持块级作用域之中声明函数，因此上面两种情况都能支持，实际并不会报错。

//es6明确引入了块级作用域，明确允许块级作用域之中声明函数。es6规定
//块级作用域之中，函数声明语句的行为类似let，在块级作用域之外不可引用
function f() {console.log('am out')}
(function () {
    if (false){
        //重复声明一次函数
        function f(){console.log('am inside')}
    }
    f();
})();


