import { useState } from 'react';
import { InfinityPass_backend } from '../../declarations/InfinityPass_backend/';

function App() {
  const [greeting, setGreeting] = useState('');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    
    const name = (event.target as HTMLFormElement).elements.namedItem('name') as HTMLInputElement;
    
    // Access the value of the name input
    const nameValue = name.value;
  
    InfinityPass_backend.greet(nameValue)
      .then((greeting: string) => {
        setGreeting(greeting);
      })
      .catch((error) => {
        console.error('Error fetching greeting:', error);
        setGreeting('Sorry, something went wrong!');
      });
    
    return false;
  }
  
  
  
  return (
    <main>
      <h1>Infinity Pass</h1>
      <br />
      <form action="#" onSubmit={handleSubmit}>
        <label htmlFor="name">Enter your name: &nbsp;</label>
        <input id="name" alt="Name" type="text" />
        <button type="submit">Click Me!</button>
      </form>
      <section id="greeting">{greeting}</section>
    </main>
  );
}

export default App;
