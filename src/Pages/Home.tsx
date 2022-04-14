import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';
import {Picker} from '@react-native-picker/picker';
import {useFocusEffect} from '@react-navigation/native';
import {useStateIfMounted} from 'use-state-if-mounted';

import Toolbar from '../Components/Toolbar';
import Footer from '../Components/Footer';
import CategoryItem from '../Components/CategoryItem';

import Splash from './Splash';

import CategoryInterface from '../Interfaces/category.interface';

import postService from '../Services/post.service';

const Home: React.FC<{navigation: any}> = ({navigation}) => {
  const [categories, setCategories] = useStateIfMounted<CategoryInterface[]>(
    [],
  );
  const [order, setOrder] = useStateIfMounted<
    'az' | 'za' | 'more' | 'less' | 'default'
  >('default');
  const [loading, setLoading] = useStateIfMounted<boolean>(true);
  const [, setForceUpdate] = useStateIfMounted<boolean>(false);

  const getPosts = async (
    cat: CategoryInterface[],
  ): Promise<CategoryInterface[]> => {
    const promises: any[] = [];
    cat.map((c: any) => {
      promises.push(
        postService.listPosts(c.id).then((responsePosts: any) => {
          c.posts = responsePosts;
          c.views = c.posts.reduce((prev: any, current: any) => {
            return prev + (current.page_views || 0);
          }, 0);
        }),
      );
    });
    return Promise.all(promises).then(() => {
      setLoading(false);
      setForceUpdate(u => !u);
      return cat;
    });
  };

  useFocusEffect(
    React.useCallback(() => {
      console.log('começou');
      postService.listCategories().then(async (responseCategories: any) => {
        console.log('get posts');
        const cats = await getPosts(responseCategories);
        console.log('terminou');
        setCategories(cats);
      });
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []),
  );

  const sort = (value: 'az' | 'za' | 'more' | 'less' | 'default') => {
    setOrder(value);
    setCategories(c => {
      c.sort((a: CategoryInterface, b: CategoryInterface) => {
        switch (value) {
          case 'az':
            return a.name > b.name ? 1 : -1;
          case 'za':
            return a.name < b.name ? 1 : -1;
          case 'more':
            return a.views < b.views ? 1 : -1;
          case 'less':
            return a.views > b.views ? 1 : -1;
          default:
            return 1;
        }
      });
      return c;
    });
  };

  if (loading) {
    return <Splash navigation={navigation} />;
  }

  return (
    <View>
      <Toolbar navigation={navigation} />
      <FlatList
        style={styles.flatList}
        data={categories}
        renderItem={({item}) => (
          <CategoryItem navigation={navigation} category={item} />
        )}
        ListHeaderComponent={() => (
          <View style={styles.orderContainer}>
            <Text style={styles.orderLabel}>ORDENAR POR:</Text>
            <View style={styles.orderPickerContainer}>
              <Picker
                selectedValue={order}
                onValueChange={sort}
                mode="dialog"
                style={styles.orderPicker}>
                <Picker.Item label="Padrão" value="default" />
                <Picker.Item label="A-Z" value="az" />
                <Picker.Item label="Z-A" value="za" />
                <Picker.Item label="Mais visualizados" value="more" />
                <Picker.Item label="Menos visualizados" value="less" />
              </Picker>
            </View>
          </View>
        )}
        ListFooterComponent={Footer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  flatList: {
    marginBottom: 70,
  },
  orderContainer: {
    flexDirection: 'row',
    marginVertical: 10,
  },
  orderLabel: {
    fontSize: 17,
    width: '60%',
    padding: 15,
    alignSelf: 'center',
  },
  orderPickerContainer: {
    borderWidth: 1,
    width: '37%',
    borderColor: '#AAA',
    borderRadius: 10,
    backgroundColor: '#EEE',
    marginLeft: 4,
  },
  orderPicker: {
    borderRadius: 20,
    position: 'relative',
    right: 0,
    borderColor: '#666',
    borderWidth: 1,
  },
});

export default Home;
