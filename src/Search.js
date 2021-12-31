import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import Card from './Card'
import './Search.scss'
import Modal from 'react-modal'
// import axios from 'axios'

Modal.setAppElement('#root')

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            showCard: false,
            floor: '',
            machine: '',
            parameter: 0,
            using: 0,
        }

        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)

        this.handleChangeFloor = this.handleChangeFloor.bind(this)
        this.handleChangeMachine = this.handleChangeMachine.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleOpenModal() {
        this.setState({ showModal: true })
    }

    handleCloseModal() {
        this.setState({ showModal: false })
    }

    handleChangeFloor(event) {
        this.setState({ floor: event.target.value })
    }

    handleChangeMachine(event) {
        this.setState({ machine: event.target.value })
    }

    handleSubmit(event) {
        // const url = ''
        // axios.get(url, {
        //     params: {
        //         floor: this.state.floor,
        //         machine: this.state.machine
        //     }
        // }).then(function (response) {
        //     this.state.parameter = response.parameter;
        //     this.state.using = response.using;
        // })
        this.setState({ parameter: 5 })
        this.setState({ using: 3 })
        this.setState({ showModal: false })
        this.setState({ showCard: true })
        event.preventDefault()
    }

    render() {
        return (
            <div className='searchBody'>
                <div
                    className='container'
                    onClick={() => this.handleOpenModal()}
                >
                    <div className='searchIcon'>
                        <BsSearch />
                    </div>
                </div>
                <Modal
                    isOpen={this.state.showModal}
                    onRequestClose={() => this.handleCloseModal()}
                    overlayClassName={'overlay'}
                    className={'contentModal'}
                >
                    <div
                        className='closeIcon'
                        onClick={() => this.handleCloseModal()}
                    >
                        <IoClose />
                    </div>
                    <form onSubmit={this.handleSubmit} className='contents'>
                        <select
                            className='selectBox'
                            onChange={this.handleChangeFloor}
                            value={this.state.floor}
                        >
                            <option value='' selected hidden disabled>
                                階を選択してください
                            </option>
                            <option value='2'>2階</option>
                            <option value='3'>3階</option>
                            <option value='4'>4階</option>
                        </select>
                        <select
                            className='selectBox'
                            onChange={this.handleChangeMachine}
                            value={this.state.machine}
                        >
                            <option value='' selected hidden disabled>
                                洗濯機か乾燥機を洗濯してください
                            </option>
                            <option value='washer'>洗濯機</option>
                            <option value='dryer'>乾燥機</option>
                        </select>
                        <button type='submit' className='enter'>
                            検索
                        </button>
                    </form>
                </Modal>
                <Card
                    floor={this.state.floor}
                    machine={this.state.machine}
                    param={this.state.parameter}
                    using={this.state.using}
                    isShow={this.state.showCard}
                />
            </div>
        )
    }
}

export default Search
