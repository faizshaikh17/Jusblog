import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import databaseService from '../appwrite/config';
import { Container, PostForm } from '../components/index';

function EditPost() {
    const [post, setPost] = useState([]);
    const { slug } = useParams();
    const navigate = useNavigate();

    useEffect(() => {

        databaseService.getPost(slug).then((post) => {
            if (post) {
                setPost(post)
                console.log(post)
            } else
                navigate('/')
        })
    }, [slug])
    return (
        <div>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    )
}

export default EditPost