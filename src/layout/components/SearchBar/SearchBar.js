import React, { useEffect, useRef, useState } from 'react'
import Tippy from '@tippyjs/react/headless';
import Popper from '../../../Components/PoperWrap/PopperWrap/Popper.js';

import classNames from 'classnames/bind'
import styles from './Search.module.scss'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faMagnifyingGlass,faCircleXmark, faSpinner} from '@fortawesome/free-solid-svg-icons'

import * as searchService from '../../../services/searchService.js'

import '../../../Components/accountItems/AccountItem.js'
import AccountItem from '../../../Components/accountItems/AccountItem.js';

import '../../../hooks/useDebounce.js'
import useDebounce from '../../../hooks/useDebounce.js';

const cx = classNames.bind(styles)
export default function SearchBar() {
    const [searchValue,setSearchValue] = useState('')
    const [searchResult,setSearchResult] = useState([])
    const [hideValue,setHideValue] = useState(true)
    const [loading,setLoading] = useState(false)
    const debouncedValue = useDebounce(searchValue,600);
    const inputRef = useRef();
    useEffect(() => {
        if (!debouncedValue) {
            setSearchResult([])
            return;
        }
        const fetchApi = async () => {
            setLoading(true)

            const result = await searchService.search(debouncedValue)
            setSearchResult(result)

            setLoading(false)
        }   
        fetchApi();   
      }, [debouncedValue]);
    const handleClear = () => {
        setSearchValue('');
        setSearchResult([]);
        inputRef.current.focus();
    }
    const handleHide = () => {
        setHideValue(false);
    }
    return (
    <div>
        <Tippy 
            onClickOutside={handleHide}
            visible={searchResult.length > 0 && hideValue}  
            interactive 
            render={attr => (
            <div className={cx('search-result')} tabIndex={-1} {...attr}>
                <Popper>
                    <h4 className={cx('search-title')}>Accounts</h4>
                    {searchResult.map((item) => {
                        return <AccountItem key={item.id} data={item}/>
                    })}
                </Popper>
            </div>
            )}>
            <div className={cx('search') + ' position-relative d-flex align-items-center'}>
            <input className={cx('search-input') + ' flex-grow-1'} 
                spellCheck={false}
                placeholder='Search accounts and videos'
                value={searchValue}
                onChange={e => {
                    e.target.value = e.target.value.trimStart();
                    setSearchValue(e.target.value)
                }}
                ref={inputRef}
                onFocus={() => setHideValue(true)}
            />
            {loading && <FontAwesomeIcon className={cx('loading')} icon={faSpinner}/>}
            {!!searchValue && !loading && 
            <button className={cx('clear')} onClick={handleClear}>
                <FontAwesomeIcon icon={faCircleXmark}/>
            </button>}
            <button className={cx('search-btn')}>
                <FontAwesomeIcon icon={faMagnifyingGlass}/>
            </button>
            </div>
        </Tippy>           
    </div>
  )
}
