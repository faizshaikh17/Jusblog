import React from 'react';
import databaseService from '../appwrite/config';
import { Link, useParams } from 'react-router-dom';
import parse from 'html-react-parser';
import Profile from './Header/Profile';
import { useSelector } from 'react-redux';

function PostCard({ $id, title, featuredImage, content, by, date }) {
    const { userData } = useSelector((state) => state.auth);
    const { posts } = useSelector((state) => state.post);
    const { slug } = useParams();


    return (
        <Link to={`/post/${$id}`} className="block">
            <div className='w-full flex flex-col md:flex-row h-auto md:h-60 gap-4 p-4 rounded-xl bg-[#171717] hover:bg-[#1f1f1f] transition-all duration-300 ease-in-out shadow-md hover:shadow-2xl border border-[#2a2a2a] hover:border-[#828287] overflow-hidden'>
                {/* Image Section */}
                <div className='w-full md:w-1/4'>
                    <img
                        className='rounded-xl object-cover w-full h-40 md:h-full hover:scale-105 transition-transform duration-300 ease-in-out'
                        src={databaseService.getFilePreview(featuredImage)}
                        alt={title}
                        loading="lazy"
                    />
                </div>

                {/* Content Section */}
                <div className='w-full md:w-3/4 flex flex-col justify-between'>
                    <div className='space-y-2'>
                        <h2 className='text-xl md:text-2xl hover:underline text-[#FCFCFF] font-semibold hover:text-[#c9c9c9] transition-colors duration-200 line-clamp-2'>
                            {title}
                        </h2>
                        <div className='bg-[#2a2a2a] rounded-lg overflow-hidden'>
                            <p className='text-sm line-clamp-3 text-[#bdbdc3] p-3'>
                                {parse(String(content).slice(0, 230) + "...")}
                            </p>
                        </div>
                    </div>

                    {/* Author & Read More Section */}
                    <div className="flex justify-between items-end mt-2">
                        <div className='flex items-center gap-2'>
                            <Profile className='text-[#171717] bg-white' >{by.toUpperCase().charAt(0) || "F"}</Profile>
                            <div className='flex flex-col'>
                                <p className='text-xs font-semibold text-[#FCFCFF]'>{by || "..."}</p>
                                <p className='text-xs font-semibold text-[#FCFCFF]'>{date}</p>
                            </div>
                        </div>
                        <Link to={`/post/${$id}`} className="block">
                            <span className="text-xs text-gray-500 hover:text-gray-400 hover:underline transition-colors duration-200">Read More →</span>
                        </Link>
                    </div>
                </div>
            </div>
        </Link>
    );
}

export default PostCard;