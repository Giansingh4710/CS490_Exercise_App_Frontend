// ExerciseCard.jsx
export default function ExerciseCard({ exercise, onSelectExercise }) {
  const handleOnExerciseClick = () => {
    console.log("Exercise clicked:", exercise);
    onSelectExercise(exercise);
  };

  return (
    <div className='exercise-card' onClick={handleOnExerciseClick}>
      <p>{exercise.name}</p> {}
    </div>
  );
}
