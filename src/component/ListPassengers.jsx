import { React, useState, useEffect } from 'react';
import { List, FlexboxGrid, Divider, Avatar } from 'rsuite';
import { AiOutlineMessage, AiOutlineCheckCircle } from "react-icons/ai";
import { FiAlertCircle, FiXCircle, FiArrowRight} from "react-icons/fi";
import { BsCalendarCheck } from "react-icons/bs";

const ListPassengers = (props) => {
    const [data, setData] = useState(props.passengers);
    console.log(data);
    function statusIcon(status) {
        if (status == "pending") {
            return(<div className="text-yellow-500 text-xl">
                        < FiAlertCircle/>
                    </div>)
        }else if (status == "accepted") {
            return(<div className="text-green-600 text-xl">
                        <AiOutlineCheckCircle/>
                    </div>)
        }else if (status == "finished") {
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
                <List.Item key={item.id_person} >
                    <FlexboxGrid>
                        <FlexboxGrid.Item colspan={2}>
                            <Avatar size="xs" circle src={item.photo_path} alt={item.surname} />
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={18}>
                            <label>{item.surname} {item.firstName}</label>
                        </FlexboxGrid.Item>
                        <FlexboxGrid.Item colspan={1}>
                            <a className="text-xl">
                                <AiOutlineMessage/>
                            </a>
                        </FlexboxGrid.Item>
                        <Divider vertical />
                        <FlexboxGrid.Item colspan={1}>
                            {statusIcon(item.status_type)}
                        </FlexboxGrid.Item>
                    </FlexboxGrid>
                </List.Item>);
            })}
        </List>
    );
}

export { ListPassengers };