import './App.css';
import { Container } from 'reactstrap';
import Routes from './routes';

function App() {
  return (
    <Container>
      <div className="content">
        <Routes />
      </div>
    </Container>
  );
}

export default App;
