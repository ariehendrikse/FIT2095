class Queue {
    constructor() {
        this.q = [];
    }
// get the current number of elements in the queue
//Getter function
    get length() {
        return this.q.length
    };
//Get all the elements 
    get queue() {
        return this.q;
    }
// Boolean function: returns true if the queue is empty, false otherwise 
    isEmpty() {
        return 0 == this.q.length;
    };
//adds new element to the end of the quue
    enqueue(newItem) {
        this.q.push(newItem)
    };
//Boolean function: returns true if an item is found (first occurnace); false otherwise
    inQueue(item) {
        let i = 0;
        let isFound = false;
        while (i < this.q.length && !isFound) {
            if (this.q[i] === item) {
                isFound = true;
            } else
                i++;
        }
        return (isFound);
    }
// pop an item from the queue
    dequeue() {
        if (0 != this.q.length) {
            let c = this.q[0];
            this.q.splice(0, 1);
            return c
        }
    };
// Removes all elements from the Queue
    removeAll(){
        this.q.length=0;
    }
// Adds a group of items to the queue
    addAll(items){
        this.q.concat(items);
    }
//removes n elements from the queue
    dequeueN(n){
        if (n>this.q.length){
            throw 'not enough items in queue';
        }
        else{
            for(let i=0;i<n;i++){
                this.dequeue();
            }
        }
    }
    viewItems(){
        for (const i in this.q){
            console.log(i+" -> "+this.q[i]);
        }
    }
    checkedInsert(item){
        //reduce method used to sum, then cheks if even
        if (this.q.reduce(function(total, num) {return total + num}, 0) %2==0)    { 
            this.q.push(item);
            }
        else{
            this.q=[item].concat(this.q);
        }
    }
};
let queue = new Queue();
queue.enqueue(10);
queue.enqueue(20);
queue.addAll([1,3,2,4]);
queue.viewItems();

console.log(queue.length);
console.log(queue.q);
queue.dequeue();
queue.enqueue(33);
queue.viewItems();
console.log(queue.inQueue(33));
console.log(queue.inQueue(88));
queue.dequeueN(3);
queue.viewItems();
queue.removeAll();
queue.viewItems();
queue.enqueue(10);
queue.enqueue(21);
console.log("");
queue.checkedInsert(4)
queue.viewItems();
