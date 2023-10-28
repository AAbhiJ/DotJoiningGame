import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../store";
import { CounterStore, decrement, increment, addBy } from "../../store/slices/CouterSlice";

const Counter = () => {

  const dispatch = useAppDispatch()

  const counter = useAppSelector(CounterStore);

  const incrementHandler = () => dispatch(increment());
  const decrementHandler = () => dispatch(decrement());
  const addByHandler = () => dispatch(addBy(10));

useEffect(() => {
  return () => {
    console.log("Component Unmount");
  }
},[])


  return (
    <>
      <h1>Counter : {counter.counter}</h1>
      <div><button onClick={incrementHandler}>Increment</button></div>
      <div><button onClick={decrementHandler}>Decrement</button></div>
      <div><button onClick={addByHandler}>Add 10</button></div>
      {/* <div><Link to="/">Link</Link></div> */}

    </>
    // <div>
    //   <Link to={"/"}>Go to Dashboard Page</Link>
    //   <br/>
    //   Counter
    //   <Srff></Srff>
    // </div>
  );
};

export default Counter;
