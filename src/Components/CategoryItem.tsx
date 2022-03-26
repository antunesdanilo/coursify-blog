import React from 'react';
import {FlatList, StyleSheet, Text, View} from 'react-native';

import CategoryItemPropsInterface from '../Interfaces/category-item.props.interface';

import PostItem from './PostItem';

const CategoryItem: React.FC<CategoryItemPropsInterface> = ({
  navigation,
  category,
}) => {
  return (
    <View style={styles.categoryContainer}>
      <View>
        <Text style={styles.title}>{category.name.toUpperCase()}</Text>
      </View>
      <FlatList
        horizontal={true}
        style={styles.postsContainer}
        data={category.posts}
        renderItem={({item}) => (
          <PostItem navigation={navigation} post={item} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  categoryContainer: {
    marginBottom: 15,
  },
  title: {
    color: '#2AB598',
    paddingVertical: 15,
    paddingHorizontal: 15,
    fontSize: 20,
    lineHeight: 30,
    fontWeight: 'bold',
  },
  postsContainer: {
    flexDirection: 'row',
    marginHorizontal: 15,
  },
});

export default CategoryItem;
