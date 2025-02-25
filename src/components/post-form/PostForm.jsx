import React, { useCallback } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import databaseService from '../../appwrite/config';
import { useNavigate } from 'react-router-dom';
import { Input, Select, Button, RTE } from '../index';
import { ID } from 'appwrite'

function PostForm({ post }) {
    const { register, handleSubmit, watch, setValue, control, getValues } = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "Active",
        },
    });

    const navigate = useNavigate();
    const { userData } = useSelector((state) => state.auth);

    const submit = async (data) => {
        try {
            if (post) {
                if (post) {
                    await databaseService.deleteFile(post.featuredImage)
                }
                const file = data.image[0] ? await databaseService.uploadFile(data.image[0]) : null
                const dbPost = await databaseService.updatePost(post.$id, { ...data, featuredImage: file ? file.$id : undefined });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`)
                    databaseService.getFilePreview(dbPost.featuredImage)
                }
            }
            else {
                const file = await databaseService.uploadFile(data.image[0]);
                if (file) {
                    const fileId = file?.$id;
                    const slug = ID.unique();
                    data.featuredImage = fileId;
                    console.log("file", file);
                    console.log("data", data);
                    const dbPost = await databaseService.createPost({ ...data, userid: userData.$id, slug: slug })
                    console.log("dbpost", dbPost.$id)
                    if (dbPost) navigate(`/post/${dbPost.$id}`)
                    databaseService.getFilePreview(dbPost.featuredImage)
                }
            }
        } catch (error) {
            console.error("An error occurred:", error);
            alert("An error occurred during submission. Please try again.");
        }
    };

    // const slugTransform = useCallback((value) => {
    //     if (value && typeof value === "string")
    //         return value.trim().toLowerCase().replace(/[^a-zA-Z\\d]+/g, "-").slice(0, 30)
    //     return ""
    // }, [])

    // React.useEffect(() => {
    //     const subscription = watch((value, { name }) => {
    //         if (name === "title") {
    //             setValue("slug", slugTransform(value.title), { shouldValidate: true })
    //         }
    //     })
    //     return () => subscription.unsubscribe()
    // }, [watch, setValue, slugTransform])

    return (
        <form
            className="w-full mx-auto my-8"
            onSubmit={handleSubmit(submit)}
        >
            <div className="w-full bg-[#111115] text-white border border-gray-500 rounded-xl p-6 shadow-lg shadow-gray-800/50">
                <div className="space-y-6">
                    <Input
                        className="mb-4 w-full bg-white text-black border-gray-700 placeholder-gray-400 rounded-lg text-xl p-2 pl-3 focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-200"
                        placeholder='Title'
                        label="Title"
                        labelClassName="text-gray-200 font-medium mb-2 block"
                        {...register("title", { required: true })}
                    />

                    {/* <Input
                        className="mb-4 w-full bg-white text-black border-gray-700 placeholder-gray-400 rounded-lg text-xl p-2 pl-3 focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-200"
                        label="Slug"
                        labelClassName="text-gray-200 font-medium mb-2 block"
                        {...register("slug", { required: true })}
                        onInput={() => { setValue("slug", slugTransform(getValues("title")), { shouldValidate: true }) }}
                    /> */}

                    <Input
                        className="mb-4 w-full bg-white text-black border-gray-700  rounded-lg text-xl p-2 pl-3 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border file:text-lg file:border-gray-700 file:text-black hover:file:bg-gray-200 transition-all duration-200"
                        type="file"
                        label="Featured Image"
                        labelClassName="text-gray-200 font-medium mb-2 block"
                        accept="image/png, image/jpg, image/jpeg, image/gif"
                        {...register("image", { required: !post })}
                    />

                    <RTE
                        label="Content"
                        name="content"
                        control={control}
                        defaultValue={getValues("content")}
                        containerClassName="bg-gray-800 rounded-lg border border-gray-700"
                        labelClassName="text-gray-200 font-medium mb-2 block"
                    />

                    <div className="flex justify-between items-center gap-4">
                        <Select
                            className="m-4 w-1/2 bg-white text-black border-gray-700 rounded-lg text-lg p-2 focus:ring-2 focus:ring-gray-600 focus:border-transparent transition-all duration-200"
                            options={["Active", "Inactive"]}
                            label="Status"
                            labelClassName="text-gray-200 font-medium mb-2 block"
                            {...register("status", { required: true })}
                        />

                        <Button
                            type="submit"
                            className={`m-4 w-1/5 h-12 rounded-lg bg-blue-500 hover:bg-blue-700 text-white text-base font-medium transition-all duration-50 `}
                        >
                            {post ? "Update" : "Submit"}
                        </Button>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default PostForm