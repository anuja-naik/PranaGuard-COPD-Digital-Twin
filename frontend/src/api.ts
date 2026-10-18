export async function api<T>(path:string, options:RequestInit={}):Promise<T>{
  const token=sessionStorage.getItem('pg-demo-token');
  const response=await fetch('/api'+path,{...options,headers:{'Content-Type':'application/json',...(token?{'X-Demo-Token':token}:{}),...options.headers}});
  if(!response.ok){let detail=response.statusText;try{const body=await response.json();detail=typeof body.detail==='string'?body.detail:JSON.stringify(body.detail);}catch{/* retain status */}throw new Error(detail);}
  return response.json();
}
export const post=<T,>(path:string,body:unknown={})=>api<T>(path,{method:'POST',body:JSON.stringify(body)});
