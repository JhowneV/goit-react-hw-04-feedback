import { useEffect, useState } from 'react';
import { FeedbackOptions } from './FeedbackOptions/FeedbackOptions';
import { Statistics } from './Statistics/Statistics';
import { Section } from './Section/Section';
import { Notification } from './Notification/Notification';

// export class App extends Component {
//   state = {
//     good: 0,
//     neutral: 0,
//     bad: 0,
//   };
const App = () => {
  const [feedback, setFeedback] = useState({
    good: 0,
    neutral: 0,
    bad: 0,
  });

  // Effect to update local storage when feedback changes
  useEffect(() => {
    const savedFeedback = JSON.parse(localStorage.getItem('feedback'));
    if (savedFeedback) {
      setFeedback(savedFeedback);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);

  // Handler function to update feedback state
  const handleFeedback = (type) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [type]: prevFeedback[type] + 1,
    }));
  };

   // Calculate total feedback count
  const total = feedback.good + feedback.neutral + feedback.bad;

  // Calculate positive feedback percentage
  const positivePercentage = total ? Math.round((feedback.good / total) * 100) : 0;

  const options = ['good', 'neutral', 'bad'];

  return (
    <>
      <Section title="Please leave feedback">
        <FeedbackOptions options={options} onLeaveFeedback={handleFeedback} />
      </Section>

      <Section title="Statistics">
        {total > 0 ? (
          <Statistics
            good={feedback.good}
            neutral={feedback.neutral}
            bad={feedback.bad}
            total={total}
            positivePercentage={positivePercentage}
          />
        ) : (
          <Notification message="There is no feedback" />
        )}
      </Section>
    </>
  );
};

export default App;




//   countTotalFeedback = () => { 
//     const { good, neutral, bad } = this.state; 
//     return good + neutral + bad;
//   };

//   countPositiveFeedbackPercentage = () => {
//       const { good } = this.state;
//       const total = this.countTotalFeedback();
//       return total ? Math.round((good / total) * 100) : 0;
//   };


//   handleClick = type => {
//     this.setState(prevState => (
//       {
//         ...prevState, [type]: prevState[type] + 1,
        
//       }));
//   };

//   render() {
//     const { good, neutral, bad } = this.state;
//     const total = this.countTotalFeedback();
//     const positivePercentage = this.countPositiveFeedbackPercentage();
//     const options = ['good', 'neutral', 'bad'];

//     return (
//       <>
//          <Section title="Please leave feedback">
//           <FeedbackOptions options={options} onLeaveFeedback={this.handleClick} />
//         </Section>
        
//            <Section title="Statistics">
//           {total > 0 ? (
//             <Statistics
//               good={good}
//               neutral={neutral}
//               bad={bad}
//               total={total}
//               positivePercentage={positivePercentage}
//             />
//           ) : (
//             <Notification message="There is no feedback" />
//           )}
//         </Section>
//       </>
//     );
//   }
// }

// export default App; 