//DATA
let DataBurgers = [
    {
        id: 123456789,
        rarity: 'Uncommon',
        name: 'Triple Cheese Burger',
        score: 7.5,
        state: 'temporal',
        progressBar: 1,
        progressBarMax: 56,
        eventTime: 0,

      },
      {
        id: 234560980,
        rarity: 'Rare',
        name: 'Triple Cheese Burger',
        score: 11.1,
        state: 'temporal',
        progressBar: 49,
        progressBarMax: 49,
        eventTime: 0,

      },
      {
        id: 809764932,
        rarity: 'Uncommon',
        name: 'Triple Cheese Burger',
        score: 7.5,
        state: 'temporal',
        progressBar: 56,
        progressBarMax: 56,
        eventTime: 0,

      },
      {
        id: 4022981,
        rarity: 'Legendary',
        name: 'Home Made Burger',
        score: 30,
        state: 'permanent',
        progressBar: 42,
        progressBarMax: 42,
        eventTime: 0,

      },
      {
        id: 256789094,
        rarity: 'Common',
        name: 'Clasic Burger',
        score: 5.1,
        state: 'temporal',
        progressBar: 56,
        progressBarMax: 56,
        eventTime: 0,

      },
      {
        id: 3618115,
        rarity: 'Common',
        name: 'Clasic Burger',
        score: 5.1,
        state: 'temporal',
        progressBar: 56,
        progressBarMax: 56,
        eventTime: 0,

      },
      {
        id: 3618116,
        rarity: 'Common',
        name: 'Clasic Burger',
        score: 5.1,
        state: 'permanent',
        progressBar: 56,
        progressBarMax: 56,
        eventTime: 0,

      },
      {
        id: 3618117,
        rarity: 'Common',
        name: 'Clasic Burger',
        score: 5.1,
        state: 'permanent',
        progressBar: 56,
        progressBarMax: 56,
        eventTime: 0,

      },
      {
        id: 3618118,
        rarity: 'Common',
        name: 'Clasic Burger',
        score: 5.1,
        state: 'temporal',
        progressBar: 56,
        progressBarMax: 56,
        eventTime: 0,

      },
      {
        id: 3618119,
        rarity: 'Common',
        name: 'Clasic Burger',
        score: 5.1,
        state: 'temporal',
        progressBar: 56,
        progressBarMax: 56,
        eventTime: 0,

      }
] 

let DataBykes = [
    {
        id: 4567653,
        state: "temporal",
        level: 1,
        progressBar: 10,
        progressBarMax: 10,
        eventTime: 0,

      },
      {
        id: 34212346,
        state: "temporal",
        level: 2,
        progressBar: 10,
        progressBarMax: 10,
        eventTime: 0,

      },
      {
        id: 12345678,
        state: "temporal",
        level: 3,
        progressBar: 10,
        progressBarMax: 10,
        eventTime: 0,

      },
      {
        id: 4567653,
        state: "temporal",
        level: 1,
        progressBar: 10,
        progressBarMax: 10,
        eventTime: 0,

      },
      {
        id: 34212346,
        state: "temporal",
        level: 2,
        progressBar: 10,
        progressBarMax: 10,
        eventTime: 0,

      },
      {
        id: 12345678,
        state: "temporal",
        level: 3,
        progressBar: 10,
        progressBarMax: 10,
        eventTime: 0,

      }
]

const fetchRequestInventoryData = () => {
    return {
        type: 'REQUEST_INVENTORY_DATA'
    }
}

const receiveInventoryData = (payload) =>{
    return {
        type: 'RECEIVE_INVENTORY_DATA',
        payload: payload
    }
}

const receiveInventoryError = (payload) => {
    return {
        type: 'RECEIVE_INVENTORY_ERROR',
        payload: payload
    }
}

const fetchsuccessDelivery = (payload) => {
    return {
        type: 'SUCCESS_DELIVERY',
        payload: payload
    }
}

const fetchResetTimer = (payload) => {
    return {
        type: 'RESET_TIMER',
        payload: payload
    }
}

export const fetchInventoryData = () => {
    return  async (dispatch) => {
        dispatch(fetchRequestInventoryData());
        try {
        setTimeout(() => {
            dispatch(receiveInventoryData({
                burgers: DataBurgers,
                bykes: DataBykes
            }));
        }, 1000);
        } catch (error) {
            dispatch(receiveInventoryError({
                errorMessage: error
            }));
            console.log("error",error);
        }
    }
}

export const fetchStartDelivery = (byke, burgers, progressLess)=>{
    return  async (dispatch) => {
        dispatch(fetchRequestInventoryData());
        const now_utc_date = new Date().toUTCString();
        const now_timestamp = new Date(now_utc_date).getTime()
        const coolDownTimer = now_timestamp + 120000;

        for(let i = 0; i < DataBurgers.length; i++) {
          if(burgers.includes(DataBurgers[i])){
            if(DataBurgers[i].state === "temporal"){
              DataBurgers[i].progressBar = DataBurgers[i].progressBar - progressLess ;
            }
              DataBurgers[i].eventTime = coolDownTimer;
          }}
      for(let i = 0; i < DataBykes.length; i++) {
          if(byke === DataBykes[i]){
            DataBykes[i].progressBar = DataBykes[i].progressBar - progressLess ;
            DataBykes[i].eventTime = coolDownTimer;
          }}
        try {
        setTimeout(() => {
            dispatch(fetchsuccessDelivery({
                bykes: DataBykes,
                burgers: DataBurgers,
            }));
        }, 2000);
        } catch (error) {
            dispatch(receiveInventoryError({
                errorMessage: error
            }));
            console.log("error",error);
        }
    }
  }

  export const fetchResetTimerDelivery = ({byke, burger})=>{
    return  async (dispatch) => {
        dispatch(fetchRequestInventoryData());
        console.log("bike",byke);
        console.log("burger",burger);
        try {
        setTimeout(() => {
            dispatch(fetchResetTimer({
                byke: byke,
                burger: burger,
            }));
        }, 1000);
        } catch (error) {
            dispatch(receiveInventoryError({
                errorMessage: error
            }));
            console.log("error",error);
        }
    }
  }
