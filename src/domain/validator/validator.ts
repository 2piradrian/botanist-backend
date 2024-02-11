export class Validator {

    static email(email: string) {
        let isValid = true;
   
        if (typeof email !== "string") {
            isValid = false;
        }
    
        if (email.length < 8 || email.length > 256) {
            isValid = false;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            isValid = false;
        }

        return isValid;
    }

    static password(password: string) {
        let isValid = true;
    
        if (typeof password !== "string") {
            isValid = false;
        }
    
        if (password.length < 7 || password.length > 256) {
            isValid = false;
        }

        return isValid;
    }
}