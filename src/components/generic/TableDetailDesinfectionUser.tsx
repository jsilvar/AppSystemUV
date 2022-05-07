import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Button, ScrollView } from 'react-native';
import { DataTable, Card, Provider, Divider } from 'react-native-paper';
import ScreenWrapper from './ScreenWrapper';
import {TABLE_DETAIL_DESINFECTION_USER} from '../../constants/GlobalConstant'

type ItemsState = Array<{
    key: string;
    area: string;
    date: string;
    time: number;
}>;

interface Props{
    itemsList:ItemsState;
    style:any;
}

export const TableDetailDesinfectionUser = (props:Props) => {

    const [sortAscending, setSortAscending] = useState<boolean>(true);
    const [page, setPage] = useState<number>(0);
    const [items] = useState<ItemsState>(props.itemsList);
    const [numberOfItemsPerPageList] = useState([2, 4, 10]);
    const [itemsPerPage, onItemsPerPageChange] = useState(
        numberOfItemsPerPageList[0]
    );

    const sortedItems = items
        .slice()
        .sort((item1, item2) =>
            (sortAscending ? item1.area < item2.area : item2.area < item1.area)
                ? 1
                : -1
        );
    const from = page * itemsPerPage;
    const to = Math.min((page + 1) * itemsPerPage, items.length);

    useEffect(() => {
        setPage(0);
    }, [itemsPerPage]);

    return (
        <Provider>
            <Card style={{ flex: 1 }}>
                <DataTable  style={styles.datatable}>
                    <DataTable.Header>
                        <DataTable.Title
                            sortDirection={sortAscending ? 'ascending' : 'descending'}
                            onPress={() => setSortAscending(!sortAscending)}
                            style={styles.first}
                        >
                            {TABLE_DETAIL_DESINFECTION_USER.AREA}
                        </DataTable.Title>
                        <DataTable.Title >{TABLE_DETAIL_DESINFECTION_USER.DATE}</DataTable.Title>
                        <DataTable.Title numeric>{TABLE_DETAIL_DESINFECTION_USER.TIME}</DataTable.Title>
                    </DataTable.Header>

                    <ScrollView style={{ marginBottom: 10 }}>
                        {sortedItems.slice(from, to).map((item) =>
                            <DataTable.Row key={item.key}>
                                <DataTable.Cell style={styles.first}>{item.area}</DataTable.Cell>
                                <DataTable.Cell numeric>{item.date}</DataTable.Cell>
                                <DataTable.Cell numeric>{item.time}</DataTable.Cell>
                            </DataTable.Row>
                        )}
                        <DataTable.Pagination
                            page={page}
                            numberOfPages={Math.ceil(sortedItems.length / itemsPerPage)}
                            onPageChange={(page) => setPage(page)}
                            label={`${from + 1}-${to} de ${sortedItems.length}`}
                            numberOfItemsPerPageList={numberOfItemsPerPageList}
                            numberOfItemsPerPage={itemsPerPage}
                            onItemsPerPageChange={onItemsPerPageChange}
                            showFastPaginationControls
                            selectPageDropdownLabel={TABLE_DETAIL_DESINFECTION_USER.PAGINATION_ROWS}
                        />
                        <Divider style={{ height: 30, backgroundColor:'white' }} />
                    </ScrollView>
                </DataTable>

            </Card>
        </Provider>

    )
}

TableDetailDesinfectionUser.title = 'Data Table';

const styles = StyleSheet.create({
    content: {
        padding: 8,
    },
    first: {
        flex: 2,
    },
    datatable:{
       borderColor:'gray',
       borderWidth:3,
       borderRadius:4
    },
    divider:{

    }
});
