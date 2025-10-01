export class ApiResponse{
    status : boolean;
    data: any;
    message:string;
    httpCode: number;

    constructor(status: boolean, data:any, message:string, httpCode:number){
        this.status = status;
        this.data = data;
        this.message = message;
        this.httpCode = httpCode;
    }
}