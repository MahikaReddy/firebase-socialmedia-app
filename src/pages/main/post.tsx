import {Post as Ipost} from '../create-post/main'
import { addDoc, collection , query, where, getDocs, deleteDoc, doc} from 'firebase/firestore'
import { auth, db } from '../../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useEffect, useState } from 'react'
interface Props{
    prost:Ipost
}

interface Like{
    likeId: string;
    userId: string;
}

export const Post =(props : Props)=>{


const {prost} = props
const [user]=useAuthState(auth)

const [likes, setLikes] = useState<Like[] | null>(null);
       //likeAmount, setLikeAmount       //number

const LikesRef = collection(db, "likes")

const likesDoc = query(LikesRef, where("postId","==", prost.id));

const getLikes= async()=>{
 const data =  await getDocs(likesDoc)
 setLikes(data.docs.map((doc)=>({userId: doc.data().userId, likeId: doc.id})))
 //setLikeAmount(data.docs.length);
}

const addLike = async()=>{
    try{
const newDoc = await addDoc(LikesRef, {userId: user?.uid, postId:prost?.id });
if (user) {
setLikes((prev)=>
prev ? [...prev, {userId: user.uid, likeId:newDoc.id }] : [{ userId: user.uid, likeId:newDoc.id}])
}
    
} catch (err){
    console.log(err)
}
}




const removeLike = async ()=>{
try{
    const likeToDeleteQuery =query(
        LikesRef,
        where("postId", "==", prost.id),
        where("userId", "==", user?.uid)
    )

    const likeToDeleteData = await getDocs(likeToDeleteQuery)
    const likeId = likeToDeleteData.docs[0].id;
    const likeToDelete = doc(db,"likes",likeId); 
   
    await deleteDoc(likeToDelete)
    if (user) {
        setLikes((prev)=>
        prev && prev.filter((like)=> like.likeId !== likeId))
        }
        
        } catch (err){
            console.log(err)
        }
        }
        









const hasUserLiked = likes?.find((like)=>like.userId === user?.uid);


useEffect(()=>{
    getLikes();
},[])

    return (
        <div>
            <div className="title">
                <h1>{prost.title}</h1>
            </div>

            <div className="body">
                <p>{prost.description}</p>
            </div>

            <div className='footer'>
                <h1>@{prost.username}</h1>
                <button onClick={hasUserLiked ? removeLike : addLike}>
                    {hasUserLiked? <>&#128078;</> : <>&#128077;</>}
                    </button>
        {likes && <p>Likes : {likes?.length}</p> }
                
            </div>
            
            
            </div>
    )
    }

    

    
     