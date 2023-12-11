import {useEffect, useState} from 'react'

function Pagination({ onPageChange, page, prodCount, dataLimit }) {
    const [pagesCount, setPagesCount] = useState(0)
    useEffect(() => {
      setPagesCount(Math.ceil(prodCount/dataLimit))
    }, [page, prodCount, dataLimit])

    if (pagesCount > 1) {
        return (
            <div dir='ltr' className="join my-4 mx-auto w-full relative left-0 justify-center">
                {page >= 4 ? (<button type="button" onClick={(e) => onPageChange(e)} id={`${page - 3}`} className="join-item btn btn-ghost text-primary">{page - 3}</button>) : ""}
                {page >= 3 ? (<button type="button" onClick={(e) => onPageChange(e)} id={`${page - 2}`} className="join-item btn btn-ghost text-primary">{page - 2}</button>) : ""}
                {page >= 2 ? (<button type="button" onClick={(e) => onPageChange(e)} id={`${page - 1}`} className="join-item btn btn-ghost text-primary">{page - 1}</button>) : ""}
                <button type="button" onClick={(e) => onPageChange(e)} id={`${page}`} className="join-item btn btn-ghost text-primary bg-gray-200">{page}</button>
                {page <= pagesCount - 1  ? (<button type="button" onClick={(e) => onPageChange(e)} id={`${page + 1}`} className="join-item btn btn-ghost text-primary">{page + 1}</button>) : null}
                {page <= pagesCount - 2 ? (<button type="button" onClick={(e) => onPageChange(e)} id={`${page + 2}`} className="join-item btn btn-ghost text-primary">{page + 2}</button>) : null}
                {page <= pagesCount - 3 ? (<button type="button" onClick={(e) => onPageChange(e)} id={`${page + 3}`} className="join-item btn btn-ghost text-primary">{page + 3}</button>) : null}

                {page < pagesCount - 3 ? (<button type="button" onClick={(e) => onPageChange(e)} className="join-item ">...</button>) : null}
                {page < pagesCount - 3 ? (<button type="button" onClick={(e) => onPageChange(e)} id={`${pagesCount - 1}`} className="join-item btn btn-ghost text-primary">{pagesCount - 1}</button>) : null}
                {page < pagesCount - 3 ? (<button type="button" onClick={(e) => onPageChange(e)} id={`${pagesCount}`} className="join-item btn btn-ghost text-primary">{pagesCount}</button>) : null}
            </div>
        )
    }
}

export default Pagination