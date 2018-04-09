import React, {Component} from 'react'
import {Panel, ListGroup, ListGroupItem} from 'react-bootstrap'
import {Modal, CustomComponent} from 'react-bootstrap'
import './QuestionEnd.css'


export default class QuestionStart extends Component {

  render() {

    const {question} = this.props
    console.log(question)
    const answers = question.incorrect_answers


    return (
      <div className="">
          <Panel>
            <Panel.Heading>{question.question}</Panel.Heading>
            <ListGroup>
              {answers.map(answer => (
                <ListGroupItem
                  onClick={this.props.onAnswer}
                  className={answer == this.props.correctAnswer ? "correct" : ""}
                >
                  {answer}
                </ListGroupItem>
              ))}
            </ListGroup>
          </Panel>
      </div>
    )
  }
}
