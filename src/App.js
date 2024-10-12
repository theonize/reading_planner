import './App.css';


export default function App() {
  return <>
    <h1>Reading Planner</h1>

    <label htmlFor="num-days">
      Number of days to completion:
    </label>

    <input type="number" id="num-days" name="num-days" />
  </>
}