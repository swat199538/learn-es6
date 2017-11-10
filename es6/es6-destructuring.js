//变量解构和赋值
//数组的解构和赋值
//基本用法，ES6运行按照一定模式，从数组和对象中提取值，对变量就行赋值
//这被称为解构

//以前变量赋值只能直接指定值。
let a = 1;
let b = 2;
let c = 3;

//ES6允许写成下面这样
let [d, e, f] = [4, 5, 6];
//上面代码表示，可以从数组中提取值，按照对应位置，对变量赋值

//本质上这种写法属于匹配模式，只要等号两边的模式相同，左边的变量就会被
//赋予对应的值。下面使用对应数组进行解构
let [foo, [[bar], baz]] = [1, [[2], 3]];
let [, , third] = [1, 2, 3];
// let [x, ,y] = [1, 2, 3]
let [head, ...tail] = [1, 2, 3, 4, 5];
let [x, y, ...z] = ['a'];
//如果结构不成功，值就会编程undefined
let [foo2] = [];
let [bar2, foo3] = [1];
//上面代码foo2和foo3都是undefined

//另一种情况是结构不完全成功，即等号左边的模式，只匹配一部分等号有变的数组
//这种情况下，结构依然能成功。
let [x1, y1] = [1, 2, 3]
let [a1, [b1], c1] = [1, [2, 3], 4];
//上面的例子都属于不完全结构，但都能成功。

//如果右边不是数组或严格来说不是可以遍历的结构，那么将会报错( is no iterable)
// let [foo9] = 1;
// let [foo4] = false;
// let [foo5] = NaN;
// let [foo6] = undefined;
// let [foo7] = null;
// let [foo8] = {};
//上面的语句都会报错，因为等号右边的值，要么转换为对象以后不具备iterable接口
//要么本身不具备iterable接口

//对于set结构,也可以用数组的解构赋值
let [xs, ys, zs] = new Set(['a', 'b', 'c']);

//事实上只要某种数据结构具有interable接口，都可以采用数组的形式解构赋值


//默认值， 结构模式允许指定默认值
let [foos = 0] = [];
let [ad, bd =2] = [1];
let [ad1, bd1 = 'b'] = ['a', undefined]
//注意，es6内部使用严格运算符(===),判断一个变量位置是否有值。所以一个数组
//成员不严格等于undefined，默认值是不会生效的。
let [xd=1] = [undefined];
let [xd2=2] = [null];

//如果默认值是一个表达式，那么这个表达式是惰性求值的，即只有用到的时候才会求值
function fs(){
    console.log('惰性求值');
}
let [xf = fs()] = [1];
//上面的函数中因为xf能够取到值，所以fs根本不会执行。上面的代码其实等价于下面代码
let xff;
if([1][0] === undefined){
    xff = fs();
} else{
    xff = [1][0];
}

//默认值可以引用解构赋值的其它变量，但该变量必须已经声明
let [cc=1, cy=cc] = [];
// let [ccc=ccy, ccy=2] = []; //报错因为CCY还没有赋值 ccy is not defined


//解构赋值不及可以用于数组也可以用于对象
let {tny, tgn} = {tny:1, tgn:2}

//对象的解构赋值和数组有一个重要的不同。数组的元素是按次序排列的，变量的取值由
//它的位置决定；而对象的属性没有次序，变量必须与属性同名才能取到正确的值
let {ttl, ocg} = {ocg:5, ttl:1}
console.log(ttl);//1
console.log(ocg);//5
let {omg} = {ffd:1, dd1:1};
console.log(omg);//undefined

//如果变量名与属性名不一致，必须写成下面这样
let obj = {first:'hello', last:'word'}
let {first:al, last:fgf} = obj;
console.log(al);
console.log(fgf);

//这实际说明，对象的解构赋值是下面的简写
let {foof:foof, barx3:barx3} = {foof:'aaa', barx3:'ddd'};
console.log(foof);
console.log(barx3);
//也就是说对象内部的赋值机制是，先找同名属性，然后在赋给对应的变量。真正被赋值的是
//后者而不是前者。
let {foods:bartt} = {foods:124, bartt:'xxx'};
console.log(bartt);
// console.log(foods);//foods is not defined
//上面的代码中foods是匹配的模式，bartt才是变量。真正赋值的是变量bartt，而不是模式foods

//与数组一样，解构也可用于嵌套结构的对象
let objx = {
    p:[
        'hello',
        {ywd: 'world'}
    ]
};
let {p:[xxg, {ywd}]} = objx;
//注意P是模式而不是变量，因此不会被赋值。如果P也要作为变量赋值，可以写成下面这样
let objxs = {
    ps:[
        'ok',
        {ywds:'no'}
    ]
}
let {ps, ps:[xxd,{ywds}]} = objxs;
