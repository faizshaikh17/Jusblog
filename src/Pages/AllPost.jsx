// import React, { useEffect, useState } from 'react'
// import databaseService from '../appwrite/config';
// import { Container, PostCard } from '../components';

// function AllPost() {
//     const [posts, setPosts] = useState([]);
//     useEffect(() => {
//         databaseService.getPosts([]).then((posts) => {
//             if (posts) {
//                 setPosts(posts.documents)
//             }
//         })
//     }, [])

//     return (
//         <div className='w-full h-[75vh] py-8'>
//             <div className=''>
//                 {
//                     posts.map((post) => (
//                         <div key={post.$id} className='p-2 w-2/3'>
//                             <PostCard {...post} />
//                         </div >
//                     ))
//                 }
//             </div>


//         </div>
//     )
// }

// export default AllPost