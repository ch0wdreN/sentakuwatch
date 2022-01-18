import React from 'react'
import { BsSearch } from 'react-icons/bs'
import { IoClose } from 'react-icons/io5'
import Card from './Card'
import './Search.scss'
import Modal from 'react-modal'

Modal.setAppElement('#root')

class Search extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            showModal: false,
            showCard: false,
            parameter: 0,
            using: 0,
            selectedValueAtFloor: '階を選択してください',
            selectedValueAtMachine: '洗濯機か乾燥機を選択してください',
        }

        this.handleOpenModal = this.handleOpenModal.bind(this)
        this.handleCloseModal = this.handleCloseModal.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleOpenModal() {
        this.setState({ showModal: true })
    }

    handleCloseModal() {
        this.setState({ showModal: false })
    }

    handleSubmit(event) {
        const params = {
            floor: this.state.selectedValueAtFloor,
            machine: this.state.selectedValueAtMachine,
        }
        const query = new URLSearchParams(params)
        fetch(`Access-Control-Allow-Origin: http://localhost:8888/number?${query}`, {mode: "cors"})
            .then((response) => {
                return response.json()
            })
            .then((data) => {
                // eslint-disable-next-line react/no-direct-mutation-state
                this.state.parameter = data.parameter
                // eslint-disable-next-line react/no-direct-mutation-state
                this.state.using = data.using
            })
            .catch((error) => {
                console.log(error)
                alert('エラーが発生しました')
                this.setState({showCard: false})
            })
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
                            value={this.state.selectedValueAtFloor}
                            onChange={(event) =>
                                this.setState({
                                    selectedValueAtFloor: event.target.value,
                                })
                            }
                        >
                            <option hidden disabled>
                                階を選択してください
                            </option>
                            <option value='2'>2階</option>
                            <option value='3'>3階</option>
                            <option value='4'>4階</option>
                        </select>
                        <select
                            className='selectBox'
                            value={this.state.selectedValueAtMachine}
                            onChange={(event) =>
                                this.setState({
                                    selectedValueAtMachine: event.target.value,
                                })
                            }
                        >
                            <option hidden disabled>
                                洗濯機か乾燥機を選択してください
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
                    floor={this.state.selectedValueAtFloor}
                    machine={this.state.selectedValueAtMachine}
                    param={this.state.parameter}
                    using={this.state.using}
                    isShow={this.state.showCard}
                />
            </div>
        )
    }
}

export default Search
