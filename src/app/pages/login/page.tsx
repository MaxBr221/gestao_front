import {propAuth} from "@/app/resources/proprietario/proprietario.auth"
import { Template } from "@/app/components/Template";
import { LoginForm } from "@/app/resources/axios.ts/formScheme";
import { userAuth } from "@/app/hooks/userAuth";

export default function LoginPage() {
    const auth = userAuth();


    async function onSubmit(form: LoginForm) {
         try {

            const credencial = await auth.login(form.login, form.senha);

        } catch (error) {
            console.error(error);
        }        
    }




    return(
        <Template>
            <div>
                
            </div>

        </Template>
    )
    

}


