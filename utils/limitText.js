export default function limitText(txt,limit){
    return txt.length <= limit ? txt : txt.slice(0,limit); 
}