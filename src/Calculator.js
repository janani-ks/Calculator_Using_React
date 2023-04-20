import React, { useState } from "react"
import "./App.css"
const Calculator = () => {
    const [flag, setFlag] = useState(true)
    const [total, setTotal] = useState([0])
    const [bool,setbool] = useState(false)
    const handleCount = (data) => {
        if (flag) {
            if(data==='+' || data==='x'){
                setTotal([data]);
                setbool(true)
            }
            else{
                setbool(false)
                setTotal([data]);
                setFlag(false);
                
            }
        }
        else{
            if((total[total.length-1]==='+' || total[total.length-1]==='-' || total[total.length-1]==='x')&&(data==='+' || data==='-' || data==='x')){
                if(total[total.length-1]!==data && total.length>2){
                    const list = [...total]
                    list.pop();
                    list.push(data);
                    setTotal(list);
                }
            }
            else
               setTotal([...total, data]);
            setbool(false)
        }
    }
    const handleChange = () => {
        if(bool){
            setbool(false)
        }
        setTotal([0]);
        setFlag(true);
    }
    const handlessetTolal=()=>{
        if(bool){
            setbool(false)
        }
        const list = [...total]
        list.pop()
        if(list.length===0){
            list.push(0)
            setFlag(true)
        }
        setTotal(list)
    }
    function check(a){
        if(a === '+'){
            return 1
        }
        else if(a === '-'){
            return 1
        }
        else{
            return 2
        }
    }
    const handleTotal = () => {
        if(bool){
            setbool(false)
        }
        const list = [...total]
        var a = [], b = 0, c = [], o = [],x,y,ans;
        for (let i = 0; i < list.length; i++) {
            if (list[i] === '+' || list[i] === '-' || list[i] === 'x') {
                a.push(b)
                b = 0
                a.push(list[i])
            }
            else{
                b = b * 10 + list[i]
            }
        }
        a.push(b)
        var len;
        if(a[a.length-1]=== '+' || a[a.length-1]=== '-' || a[a.length-1] === 'x')
            len = a.length-1
        else
            len = a.length
        for (let i = 0; i < len; i++) {
            if (typeof(a[i])==="number"){
                c.push(a[i])
            }
            else if((a[i] === '+' || a[i] === '-' || a[i] === 'x') && (o.length===0||check(o[o.length-1])<=check(a[i]))){
                o.push(a[i])
            }
            else {
                b = o.pop()
                x = c.pop()
                y = c.pop()
                switch(b){
                    case '+':
                        ans = x+y
                        break
                    case '-':
                        ans = y-x
                        break
                    case 'x':
                        ans = x*y
                        break
                }
                c.push(ans)
                o.push(a[i])
            }
        }
        while(c.length>1){
            b = o.shift()
            x = c.shift()
            y = c.shift()
                switch(b){
                    case '+':
                        ans = x+y
                        break
                    case '-':
                        ans = x-y
                        break
                    case 'x':
                        ans = x*y
                        break
                }
            c.unshift(ans)
        }
        setTotal(c)
    }
    return (
        <>
            <div className="total">
                <div className="count">
                    {bool && <p>Error</p>}
                    <p>{total}</p>
                </div>
                <div className="container">
                    <button onClick={() => { handleCount(9) }}>9</button>
                    <button onClick={() => { handleCount(8) }}>8</button>
                    <button onClick={() => { handleCount(7) }}>7</button>
                    <button onClick={() => { handleCount('x') }}>x</button>
                    <button onClick={() => { handleCount(6) }}>6</button>
                    <button onClick={() => { handleCount(5) }}>5</button>
                    <button onClick={() => { handleCount(4) }}>4</button>
                    <button onClick={() => { handleCount('-') }}>-</button>
                    <button onClick={() => { handleCount(3) }}>3</button>
                    <button onClick={() => { handleCount(2) }}>2</button>
                    <button onClick={() => { handleCount(1) }}>1</button>
                    <button onClick={() => { handleCount('+') }}>+</button>
                    <button onClick={handleChange}>AC</button>
                    <button onClick={() => { handleCount(0) }}>0</button>
                    <button onClick={() => { handlessetTolal(0) }}>&larr;</button>
                    <button onClick={handleTotal}>=</button>
                </div>
            </div>
        </>
    )
}

export default Calculator