import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../components';
import databaseService from '../appwrite/config';
import { useDispatch, useSelector } from 'react-redux';
import Button from '../components/Button';
import { Link } from 'react-router-dom';
import { fetchPosts } from '../features/postSlice';
import Profile from '../components/Header/Profile';

// Function to generate a random poppy color

function Home() {
    const authStatus = useSelector((state) => state.auth.status);
    const dispatch = useDispatch();
    const { posts, loading, error } = useSelector((state) => state.post);

    useEffect(() => {
        if (posts) dispatch(fetchPosts());
    }, [dispatch, posts]);

    const [authors, setAuthors] = useState([]);

    useEffect(() => {
        if (posts) {
            // Extract authors and remove duplicates efficiently
            const uniqueAuthors = [...new Set(posts.map(post => post.by))];
            setAuthors(uniqueAuthors);
        }
    }, [posts]);


    if (!authStatus) {
        return (
            <main className="top-[10%] absolute flex-grow w-full flex flex-col items-center justify-center overflow-hidden">
                {/* Falling Beam Effects */}
                <div className="absolute z-[2] inset-0 pointer-events-none">
                    {Array.from({ length: 5 }, (_, i) => (
                        <div
                            key={i}
                            className="absolute top-0 left-1/2 transform -translate-x-1/2 w-0.5 h-10 bg-gradient-to-b from-pink-400 to-transparent opacity-0 animate-falling-beam"
                            style={{
                                animationDelay: `${Math.random() * 5}s`,
                                left: `${Math.random() * 100}%`,
                            }}
                        />
                    ))}
                </div>

                <section className="text-center px-4 relative">
                    <div className='flex flex-col animate-fade-in'>
                        <h1 className="text-7xl font-light md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-pink-100 to-pink-400 animate-text-glow leading-tight pt-serif-regular">
                            Ideas &
                        </h1>
                        <h1 className="text-7xl md:text-9xl text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-pink-100 animate-text-glow leading-tight pt-serif-regular">
                            Stories
                        </h1>

                    </div>
                    <p className=" mt-10 text-sm md:text-lg text-gray-300 font-light tracking-wide animate-fade-in-delay pt-serif-regular-italic">
                        Unleash & Express your writeups.
                    </p>
                </section>
                <Link to={'/signup'}>
                    <Button className=' mt-8 text-xl px-6 rounded-3xl font-semibold bg-white'>
                        Get Started
                    </Button>
                </Link>
            </main>
        );
    } else {
        return (

            <div className='w-full flex'>
                <div className='mx-6 w-2/3'>
                    <div className='flex flex-col gap-6'>
                        <h1 className='text-3xl text-[#FCFCFF] font-bold'>Blogs</h1>
                        {posts.map((post) => (
                            <div key={post.$id} className='w-full'>
                                <PostCard {...post} />
                            </div>
                        ))}
                    </div>
                </div>
                <div className='space-y-6 h-full mx-6 w-1/3'>
                    <h1 className='text-3xl text-[#FCFCFF] font-bold'>Authors</h1>
                    <div className='flex flex-col md:flex-row h-full md:h-full gap-4 p-4 rounded-xl bg-[#171717] hover:bg-[#1f1f1f] transition-all duration-300 ease-in-out shadow-md hover:shadow-2xl border border-[#2a2a2a] hover:border-[#828287] overflow-hidden'>
                        <div className='flex flex-col gap-4'>
                            {authors.map((name) => {
                                return (
                                    <div key={name} className='flex gap-3 text-xl font-bold text-[#FCFCFF] items-center w-full'>
                                        <Profile className={`text-[1.5rem] bg-pink-300 hover:bg-pink-200 h-[3.2rem] w-[3.2rem] `}>{name.toUpperCase().charAt(0)}</Profile>
                                        <span className='hover:underline'>{name}</span>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}

export default Home;