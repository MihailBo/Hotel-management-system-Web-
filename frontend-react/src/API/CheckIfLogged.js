

export  default async function checkIfLogged(){
    const response = await fetch("http://localhost:8080/auth/status",{
        credentials: "include",
    });

    return response.ok;
}