import { React, useState, useEffect } from 'react';
import { List, FlexboxGrid, Divider, Avatar } from 'rsuite';
import { AiOutlineMessage, AiOutlineCheckCircle } from "react-icons/ai";
import { FiAlertCircle, FiXCircle, FiArrowRight} from "react-icons/fi";
import { BsCalendarCheck } from "react-icons/bs";

const ListPassengers = (props) => {
    const [data, setData] = useState(props.passengers);
    console.log(props.passengers)
    function statusIcon(status) {
        if (status == "PENDING") {
            return(<div className="text-yellow-500 text-xl">
                        < FiAlertCircle/>
                    </div>)
        }else if (status == "ACCEPTED") {
            return(<div className="text-green-600 text-xl">
                        <AiOutlineCheckCircle/>
                    </div>)
        }else if (status == "FINISHED") {
            return(<div className="text-blue-900 text-xl">
                        <BsCalendarCheck/>
                    </div>)
        }else if (!status) {
            return(<div className="text-red-600 text-xl">
                        <FiXCircle/>
                    </div>)
        }
    }
    return(
        <List>
            {data.map((item) => {
                return(
                <List.Item key={item.person.id} >
                    <FlexboxGrid>
                        <FlexboxGrid.Item colspan={2}>
                            <Avatar size="xs" circle src={item.person.photo_path} alt={item.person.surname} />
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={18}>
                            <label>{item.person.surname} {item.person.firstName}</label>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={1}>
                            <a className="text-xl">
                                <AiOutlineMessage/>
                            </a>
                        </FlexboxGrid.Item>
                        <Divider vertical />
                        <FlexboxGrid.Item colspan={1}>
                            {statusIcon(item.statusType)}
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </List.Item>);
            })}
        </List>
    );
}

export { ListPassengers };