import axios from 'axios';

const getUserToken = async (user) => {
    if(user){
        return await user.getIdToken();
    }else{
        console.log("Not logged in");
        return 'not-logged-in';
    }
}

// Users microservice - create user
const createUser = async (data) => {
    try {
        return await axios.post('/user-service/api/users/create', data);
    } catch (error) {
        console.log(error);
    }
};

// Users microservice - get user
const getUser = async ({urlUid, setUser}) => {
    try{
        await axios.get(`/user-service/api/users/${urlUid}`)
            .then((resp) => {
                setUser(resp.data);
            })
            .catch((err) => {
                console.log(err);
            })
    } catch (err) {
        console.log(err);
    }
};

// Post microservice - create posts
const createPost = async (data, user) => {
    try {
        const token = await getUserToken(user);

        return await axios.post('/posting-service/api/posts/create', data, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (err) {
        console.log(err);
    }
}

// Post microservice - get posts
const getPosts = async (setPost) => {
    try{
        await axios.get('/posting-service/api/posts')
            .then((resp) => {
                setPost(resp.data);
            })
            .catch((err) => {
                console.log(err);
            })
    } catch (err) {
        console.log(err);
    }
}

// Advertising microservice
const uploadImage = async (bucketUrl, data, file, username, user) => {
    try {
        // return await axios.post(`/upload?username=${username}`, data);
        const token = await getUserToken(user);
        return await fetch(`/upload?username=${bucketUrl}`, {
            method: 'POST',
            body: data,
            files: file,
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    } catch (error) {
        console.log(error);
    }
}
const downloadImage = async (bucketUrl, username, filename, user) => {
    try {
        const token = await getUserToken(user);
        return await fetch(`/download?username=${bucketUrl}&filename=${filename}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
    } catch (error) {
        console.log(error);
    }
}

export {
    createUser,
    getUser,
    createPost,
    getPosts,
    uploadImage,
    downloadImage
};