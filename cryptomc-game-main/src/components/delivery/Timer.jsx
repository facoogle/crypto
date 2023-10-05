import moment from 'moment';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BYKE_SELECT, SHOW_BYKE } from '../../redux/constanst';



export default function Timer({ eventTime, interval, byke, burger, selectByke, close, selectBurger }) {

    const dispatch = useDispatch();

    const [timeLeft, setTimeLeft] = useState('00:00:00');
    const [difTime, setDifTime] = useState(0);
    const now_utc_date = new Date().toUTCString();
    const now_timestamp = new Date(now_utc_date).getTime();
    const closeBurgers = () => {
        selectBurger(burger)
        close();
    }

    const calculateTimeLeft = () => {
        let diff_time = moment.duration(moment(now_timestamp).diff(moment(eventTime)));
        setDifTime(diff_time);
        let diff_hours = diff_time.hours().toString().replace('-', '') > 9 ? diff_time.hours().toString().replace('-', '') : `0${diff_time.hours().toString().replace('-', '')}`;
        let diff_minutes = diff_time.minutes().toString().replace('-', '') > 9 ? diff_time.minutes().toString().replace('-', '') : `0${diff_time.minutes().toString().replace('-', '')}`;
        let diff_seconds = diff_time.seconds().toString().replace('-', '') > 9 ? diff_time.seconds().toString().replace('-', '') : `0${diff_time.seconds().toString().replace('-', '')}`;
        return (
            diff_hours + ':' +
            diff_minutes + ':' +
            diff_seconds);
    }

    const timerCallback = useCallback(() => {
        setTimeLeft(calculateTimeLeft());
    }, [eventTime, now_timestamp]);

    useEffect(() => {
        let t = setInterval(timerCallback, interval);
        return () => clearInterval(t);

    }, [eventTime, interval, timerCallback]);
    return (
        <>
            {/* {difTime > 0 ? */}
                <button onClick={byke === undefined ?
                    () => closeBurgers(burger) :
                    () => {dispatch({type: BYKE_SELECT, bykeSelect: byke})
                    dispatch({type: SHOW_BYKE, showByke: false})}}
                    className='btn-select'>Select</button>
              {/*   :
                <button className='btn-select block-button'>{timeLeft}</button>

            } */}
        </>
    )
}
