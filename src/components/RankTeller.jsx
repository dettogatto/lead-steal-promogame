import React, { useState, useEffect } from 'react';
const RankTeller = (props) => {

  const [astate, setAstate] = useState("");

  useEffect(() => {

  }, [astate])

  return (
    <div>
      Your rank: {props.rank}
    </div>
  )
}
export default RankTeller;
