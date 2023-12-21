import React from 'react'
import classNames from 'classnames/bind'
import styles from './PopperReport.module.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFlag } from '@fortawesome/free-regular-svg-icons';
import { faHeartCrack } from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);
export default function PopperReport() {
  return (
    <div className={cx('wrapper')}>
        <div className={cx('report-item')}>
            <FontAwesomeIcon className={cx('icon')} icon={faFlag}/>
            <span className={cx('report')}>Báo cáo</span>
        </div>
        <div className={cx('report-item')}>
            <FontAwesomeIcon className={cx('icon')} icon={faHeartCrack}/>
            <span className={cx('unsuitable')}>Đánh dấu không phù hợp</span>
        </div>
    </div>
  )
}
