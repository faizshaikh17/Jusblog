import React from 'react';
import databaseService from '../appwrite/config';
import { Link } from 'react-router-dom';
import parse from 'html-react-parser';

function PostCard({ $id, title, featuredImage, content }) {
    return (
        <Link to={`/post/${$id}`} className="block">
            <div className='w-full flex h-60 gap-4 p-4 rounded-xl bg-[#171717] hover:bg-[#1f1f1f] transition-all duration-300 ease-in-out shadow-md hover:shadow-2xl border border-[#2a2a2a] hover:border-[#828287] overflow-hidden'>
                <div className='w-3/4 flex flex-col justify-between'>
                    <div className='space-y-3'>
                        <h2 className='text-2xl hover:underline text-[#FCFCFF] font-semibold hover:text-[#c9c9c9] transition-colors duration-200 line-clamp-2'>
                            {title}
                        </h2>
                        <div className='bg-[#2a2a2a] rounded-lg  overflow-hidden'>
                            <p className='text-sm line-clamp-3 text-[#bdbdc3] p-3'>
                                {parse(content)}
                            </p>
                        </div>
                    </div>
                    <div className="flex justify-start items-start">
                        <Link to={`/post/${$id}`} className="block">
                            <span className="text-xs text-gray-500 hover:text-gray-400 hover:underline transition-colors duration-200">Read More →</span>
                        </Link>
                    </div>
                </div>
                <div className='w-1/4'>
                    <img
                        className='rounded-xl object-cover w-full h-full hover:scale-105 transition-transform duration-300 ease-in-out'
                        src={databaseService.getFilePreview(featuredImage)}
                        alt={title}
                        loading="lazy" // Add lazy loading for performance
                    />
                </div>
            </div>
        </Link>
    );
}

export default PostCard;