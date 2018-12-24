var msgs = [
    {text:'1',created:1},
    {text:'2',created:2},
    {text:'3',created:3},
    {text:'4',created:4},
    {text:'5',created:5},
]
console.log(msgs.filter(x=>(x.created==4||x.created==2)));

var newMsgs = [{text:'old history',created:0},];

console.log(newMsgs.concat(msgs.filter(x=>(x.created==4||x.created==2))));

