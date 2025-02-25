import React, { useEffect, useState } from 'react';
import { Container, PostCard } from '../components';
import databaseService from '../appwrite/config';
import { useSelector } from 'react-redux';
import Button from '../components/Button';
import { Link } from 'react-router-dom';

function Home() {
    const [posts, setPosts] = useState([]);
    const authStatus = useSelector((state) => state.auth.status);

    useEffect(() => {
        databaseService.getPosts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents);
            }
        });
    }, []);

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
            <div className='w-full px-2 py-8'>

                <div className='flex flex-col gap-6'>
                    {posts.map((post) => (
                        <div key={post.$id} className='w-2/3'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </div>
        );
    }
}

export default Home;