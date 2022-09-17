
export const getImageUrl = (id: string) => {
    if(id === "default") return "/default.jpg"
    return `https://quizapp-meshno.s3.eu-central-1.amazonaws.com/categories/${id}`
}