import React, { useEffect, useRef, useState } from 'react';
import ReadNote from './ReadNote';
import { connect } from 'react-redux';
import classes from './CurrentNote.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAngleDoubleUp } from '@fortawesome/free-solid-svg-icons';

const scrollToRef = (myRef) => {
  const myElement = document.getElementById("currNote");
  myElement.scrollTo({ left: 0, top: myRef.current.offsetTop - 100, behavior: 'smooth' });
}
const useMountEffect = (fun) => useEffect(fun, [])




const CurrentNote = props => {
  const [showScrollBtn, SetShowScrollBth] = useState(false);
  const myRef = useRef(null);
  useMountEffect(() => scrollToRef(myRef)) // Scroll on mount

  const onScroll = () => {
    SetShowScrollBth(true);
  }
  return (
    <div className={classes.note} id="currNote" onScroll={onScroll}>
      <div ref={myRef} className={classes.note_title}>{props.currentNoteName}</div>
      <ReadNote currentNoteContent={props.currentNote}/>
      <button className={ showScrollBtn ?  classes.scroll : [classes.scroll, classes.hidden]} onClick={() => scrollToRef(myRef)}>
        <FontAwesomeIcon icon={faAngleDoubleUp} color="white" size="2x" />
      </button>

    </div>
  )
}

const mapStateToProps = state => {
  return {
    currentNote: state.note.currentNote ? state.note.currentNote : null,
    currentNoteId: state.note.currentNoteId ? state.note.currentNoteId : null,
    currentNoteName: state.note.currentNoteName ? state.note.currentNoteName : null,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    // loadCurrentNote: (noteId) => dispatch(actions.loadCurrentNote(noteId))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CurrentNote);