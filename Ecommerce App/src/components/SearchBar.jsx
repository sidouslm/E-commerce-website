import React from 'react'
import { ShopContext } from '../context/ShopContext.jsx';
import { useLocation } from 'react-router-dom';

const SearchBar = () => {

    const { search, setSearch, showSearch, setShowSearch } = React.useContext(ShopContext);
    const [visible, setVisible  ] = React.useState(false);
    const location = useLocation();

    React.useEffect(() => {
        if(location.pathname.includes('collection') ){
            setVisible(true)
        } else {
            setVisible(false)
        }
    },[location]);
    return showSearch && visible ? (
        <div className='border-t bg-slate-50 text-center'>
            <div className='inline-flex items-center justify-center border border-slate-400 px-5 py-2 mx-3 my-5 rounded-full w-3/4 sm:w-1/2'>
                <input value={search} onChange={(e) => setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm capitalize font-normal text-slate-700' type="text" placeholder='Search' />
                <svg className='w-4 bi bi-search' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"  viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
                </svg>
            </div>
                <svg onClick={()=>setShowSearch(false)} className='inline  cursor-pointer hover:rotate-90 bi bi-x' xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor"viewBox="0 0 16 16">
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                </svg>
        </div>
    ) : null
}

export default SearchBar
