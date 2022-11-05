export const firebaseAuthMessageConverter = (code?: string) => {
    if(code === 'auth/user-not-found'){
        return 'Incorrect credentials'
    }
    if(code === 'auth/invalid-email'){
        return 'Email is not valid'
    }
    if(code === 'auth/email-already-exists'){
        return 'Email is used by other user'
    }
    if(code === 'auth/email-already-in-use'){
        return 'Email is used by other user'
    }
    if(code === 'auth/wrong-password'){
        return 'Your password is incorrect'
    }

    return 'Uknown error has occured'
}

export const shortenSentence = (sentence: string, max: number, suffix: string) => {
    const truncatedSentence = sentence?.length < max ? sentence : `${sentence?.substr(0, sentence?.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;
    return truncatedSentence
}