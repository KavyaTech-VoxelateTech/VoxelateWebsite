import Link from 'next/link';

export default function NavLink(props){
    return (
        <Link className="opacity-60 hover:opacity-100" href={props.path}>
            {props.text}
        </Link>
    )
}