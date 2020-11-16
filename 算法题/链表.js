function Node(e){
    this.val=e;
    this.next=null;
}
let length=0;
let head=null;
//尾加
Node.prototype.append=function(e){
    let node=new Node(e);
    let current;
    if(head===null){
        head=node;
    }else{
        current=head;
        while(current.next){
            current=current.next
        }
        current.next=node;
    }
    length++;
}

//删除 by 值
Node.prototype.removeChild=function(e){
    let pre,next,cur;
    if(head!=null){
        while(current.val!=e){
            pre=cur;
            cur=cur.next;
            next=cur.next;
        }
        pre.next=next;
        length--;
    }else{
        return false;
    }
}
//删除 by 位置
Node.prototype.removedAt=function(p){
    if(p>-1&&p<length){
        let cur=head,pre,next,i=0;
        while(i<pre){
            pre=cur;
            cur==cur.next;
            next=cur.next;
        }
        pre.next=next;
        length--;
        return true;
    }else{
        return false;
    }
}
//