
export type PollQuestion = {
    id: string,
    title: string,
    owner: string,
    created: string,
    modified: string,
    deleted: string,
}

export type PollAnswer = {
    id: string,
    question: string,
    content: string,
    owner: string,
    created: string,
    modified: string,
    deleted: string,
}